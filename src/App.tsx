import { useState, useRef, useEffect, useCallback, type ReactElement } from 'react'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']

type ImageItem = {
  name: string
  url: string
}

type IconName = 'vercel' | 'folder' | 'image' | 'play' | 'pause' | 'previous' | 'next' | 'timer'

function Icon({ name, className = 'icon' }: { name: IconName; className?: string }) {
  if (name === 'vercel') {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4 22 21H2L12 4z" />
      </svg>
    )
  }

  const paths: Record<Exclude<IconName, 'vercel'>, ReactElement> = {
    folder: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75A2.25 2.25 0 016 4.5h3l1.5 1.5H18A2.25 2.25 0 0120.25 8.25v7.5A2.25 2.25 0 0118 18H6a2.25 2.25 0 01-2.25-2.25v-9z" />
    ),
    image: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25V6.75zm3.75 8.25l2.25-2.25a1.5 1.5 0 012.12 0l1.13 1.13 1.5-1.5a1.5 1.5 0 012.12 0l2.13 2.12M8.25 8.25h.01" />
    ),
    play: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 5.25v13.5l10.5-6.75-10.5-6.75z" />,
    pause: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 5.25v13.5M15.75 5.25v13.5" />,
    previous: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />,
    next: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />,
    timer: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75V12l3 2.25M9 3.75h6M12 21a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />,
  }

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

async function* getFiles(dirHandle: FileSystemDirectoryHandle): AsyncGenerator<FileSystemFileHandle> {
  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file') {
      const name = entry.name.toLowerCase()
      if (IMAGE_EXTENSIONS.some(ext => name.endsWith(ext))) {
        yield entry as FileSystemFileHandle
      }
    } else if (entry.kind === 'directory') {
      yield* getFiles(entry as FileSystemDirectoryHandle)
    }
  }
}

function formatInterval(ms: number) {
  return ms >= 1000 && ms % 1000 === 0 ? `${ms / 1000}s` : `${ms}ms`
}

export default function App() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [interval, setIntervalTime] = useState(3000)
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPlaying = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPlaying(false)
  }, [])

  const startPlaying = useCallback(() => {
    stopPlaying()
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= images.length - 1) {
          stopPlaying()
          return prev
        }
        return prev + 1
      })
    }, interval)
    setIsPlaying(true)
  }, [interval, images.length, stopPlaying])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(images.length - 1, prev + 1))
  }, [images.length])

  const togglePlay = useCallback(() => {
    if (images.length <= 1) return

    if (isPlaying) {
      stopPlaying()
    } else {
      setIsPlaying(true)
    }
  }, [images.length, isPlaying, stopPlaying])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isPlaying && images.length > 1) {
      startPlaying()
    }
  }, [images, isPlaying, startPlaying])

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.url))
    }
  }, [images])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlePrev()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleNext()
      }

      if (event.key === ' ') {
        event.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev, togglePlay])

  const handleSelectDirectory = async () => {
    if (!('showDirectoryPicker' in window)) {
      setError('当前浏览器不支持目录选择，请使用 Chrome 或 Edge。')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const dirHandle = await window.showDirectoryPicker()
      const fileHandles: FileSystemFileHandle[] = []

      for await (const fileHandle of getFiles(dirHandle)) {
        fileHandles.push(fileHandle)
      }

      fileHandles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

      if (fileHandles.length === 0) {
        setImages([])
        setCurrentIndex(0)
        setFileName(dirHandle.name)
        setError('这个目录里没有可浏览的图片。支持 jpg、png、gif、bmp、webp 和 svg。')
        stopPlaying()
        return
      }

      const items = await Promise.all(
        fileHandles.map(async (fh) => {
          const file = await fh.getFile()
          return {
            name: fh.name,
            url: URL.createObjectURL(file),
          }
        })
      )

      setImages(items)
      setCurrentIndex(0)
      setFileName(dirHandle.name)
      stopPlaying()
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError('目录读取失败，请重新选择。')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const hasImages = images.length > 0
  const currentImage = images[currentIndex]
  const progress = images.length > 1 ? ((currentIndex + 1) / images.length) * 100 : 100

  const playbackControls = (
    <div className="control-strip" aria-label="播放控制">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="icon-button"
        aria-label="上一张"
        title="上一张"
      >
        <Icon name="previous" />
      </button>

      <button
        onClick={togglePlay}
        disabled={images.length <= 1}
        className="action-button"
        aria-label={isPlaying ? '暂停播放' : '播放幻灯片'}
        title={isPlaying ? '暂停播放' : '播放幻灯片'}
      >
        <Icon name={isPlaying ? 'pause' : 'play'} />
        <span>{isPlaying ? '暂停' : '播放'}</span>
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex === images.length - 1}
        className="icon-button"
        aria-label="下一张"
        title="下一张"
      >
        <Icon name="next" />
      </button>
    </div>
  )

  const intervalControl = (
    <label className="interval-control" htmlFor="interval">
      <Icon name="timer" />
      <input
        id="interval"
        aria-label="播放间隔，毫秒"
        type="number"
        min={500}
        max={30000}
        step={500}
        value={interval}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 3000
          setIntervalTime(val)
          if (isPlaying) {
            stopPlaying()
            setTimeout(() => {
              setIsPlaying(true)
            }, 0)
          }
        }}
      />
      <span>ms</span>
    </label>
  )

  if (!hasImages) {
    return (
      <main className="viewer-root empty-root">
        <section className="empty-panel">
          <span className="brand-mark" aria-hidden="true">
            <Icon name="vercel" />
          </span>
          <Icon name="image" className="empty-image-icon" />
          <h1>图片浏览器</h1>
          <p>选择一个本地目录开始浏览。</p>
          <button onClick={handleSelectDirectory} disabled={isLoading} className="primary-button">
            <Icon name="folder" />
            {isLoading ? '读取中' : '选择目录'}
          </button>
          {error && <p className="inline-error">{error}</p>}
          <p className="format-note">jpg / png / gif / bmp / webp / svg</p>
        </section>
      </main>
    )
  }

  return (
    <main className="viewer-root image-root">
      <section className="image-stage" aria-label="图片浏览区">
        <img
          src={currentImage.url}
          alt={currentImage.name}
          className="viewer-image"
          draggable={false}
        />
      </section>

      <header className="top-overlay">
        <div className="file-meta">
          <span>{currentIndex + 1}/{images.length}</span>
          <strong>{currentImage.name}</strong>
        </div>
        <button onClick={handleSelectDirectory} disabled={isLoading} className="ghost-button">
          <Icon name="folder" />
          <span>{isLoading ? '读取中' : '更换目录'}</span>
        </button>
      </header>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-value" style={{ width: `${progress}%` }} />
      </div>

      <footer className="bottom-overlay">
        {playbackControls}
        <span className={isPlaying ? 'state-badge active' : 'state-badge'}>
          {isPlaying ? '播放中' : '已暂停'} · {formatInterval(interval)}
        </span>
        {intervalControl}
      </footer>
    </main>
  )
}
