import { useState, useRef, useEffect, useCallback, type ReactElement } from 'react'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
const DEFAULT_INTERVAL = 2000
const HIDE_CHROME_AFTER = 3000

type ImageItem = {
  name: string
  url: string
}

type IconName = 'folder' | 'play' | 'pause' | 'previous' | 'next' | 'timer'

function Icon({ name, className = 'icon' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactElement> = {
    folder: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75A2.25 2.25 0 016 4.5h3l1.5 1.5H18A2.25 2.25 0 0120.25 8.25v7.5A2.25 2.25 0 0118 18H6a2.25 2.25 0 01-2.25-2.25v-9z" />
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

export default function App() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [interval, setIntervalTime] = useState(DEFAULT_INTERVAL)
  const [isChromeVisible, setIsChromeVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const chromeHideRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasImages = images.length > 0

  const clearChromeTimer = useCallback(() => {
    if (chromeHideRef.current) {
      clearTimeout(chromeHideRef.current)
      chromeHideRef.current = null
    }
  }, [])

  const scheduleChromeHide = useCallback(() => {
    clearChromeTimer()
    if (!hasImages) return

    chromeHideRef.current = setTimeout(() => {
      setIsChromeVisible(false)
    }, HIDE_CHROME_AFTER)
  }, [clearChromeTimer, hasImages])

  const revealChrome = useCallback(() => {
    if (!hasImages) return
    setIsChromeVisible(true)
    scheduleChromeHide()
  }, [hasImages, scheduleChromeHide])

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
      clearChromeTimer()
    }
  }, [clearChromeTimer])

  useEffect(() => {
    if (!hasImages) {
      clearChromeTimer()
      setIsChromeVisible(true)
      return
    }

    setIsChromeVisible(true)
    scheduleChromeHide()

    return clearChromeTimer
  }, [clearChromeTimer, hasImages, scheduleChromeHide])

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
      revealChrome()

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
  }, [handleNext, handlePrev, revealChrome, togglePlay])

  useEffect(() => {
    if (!hasImages) return

    const handleActivity = () => revealChrome()
    const events = ['pointermove', 'pointerdown', 'wheel', 'touchstart']

    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
    }
  }, [hasImages, revealChrome])

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
      stopPlaying()
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError('目录读取失败，请重新选择。')
      }
    } finally {
      setIsLoading(false)
    }
  }

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
        <span className="sr-only">{isPlaying ? '暂停' : '播放'}</span>
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
          const val = parseInt(e.target.value) || DEFAULT_INTERVAL
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
          <h1>图片浏览器</h1>
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
    <main
      className={isChromeVisible ? 'viewer-root image-root' : 'viewer-root image-root chrome-hidden'}
      onFocusCapture={revealChrome}
    >
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
          <span className="sr-only">{isLoading ? '读取中' : '更换目录'}</span>
        </button>
      </header>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-value" style={{ width: `${progress}%` }} />
      </div>

      <footer className="bottom-overlay">
        {playbackControls}
        {intervalControl}
      </footer>
    </main>
  )
}
