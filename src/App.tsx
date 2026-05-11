import { useState, useRef, useEffect, useCallback, type ReactElement } from 'react'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']

type ImageItem = {
  name: string
  url: string
}

type IconName = 'folder' | 'image' | 'play' | 'pause' | 'previous' | 'next'

function Icon({ name, className = 'h-4 w-4' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactElement> = {
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

  const currentImage = images[currentIndex]
  const progress = images.length > 1 ? ((currentIndex + 1) / images.length) * 100 : 100

  if (images.length === 0) {
    return (
      <main className="app-background min-h-screen overflow-hidden text-on-background">
        <div className="ambient-orb ambient-orb-a" />
        <div className="ambient-orb ambient-orb-b" />

        <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
          <div className="glass-panel w-full max-w-xl px-8 py-10 text-center sm:px-12">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 text-secondary shadow-[0_8px_32px_rgba(0,0,0,0.16)]">
              <Icon name="image" className="h-12 w-12" />
            </div>
            <p className="mb-3 text-label-sm uppercase text-on-surface-variant">Picture Viewer</p>
            <h1 className="mb-4 text-headline-lg text-primary">图片浏览器</h1>
            <p className="mx-auto mb-8 max-w-sm text-body-md text-on-surface-variant">
              选择一个包含图片的目录，以玻璃拟态视图浏览并播放本地图片。
            </p>
            <button
              onClick={handleSelectDirectory}
              disabled={isLoading}
              className="glass-primary-button mx-auto"
            >
              <Icon name="folder" />
              {isLoading ? '读取中' : '选择目录'}
            </button>
            {error && (
              <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-body-md text-error">
                {error}
              </p>
            )}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="app-background flex h-screen flex-col overflow-hidden text-on-background">
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />

      <header className="relative z-20 px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="glass-toolbar flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-label-sm uppercase text-on-surface-variant">当前目录</p>
            <div className="mt-1 flex min-w-0 items-center gap-3">
              <span className="truncate text-headline-md text-primary">{fileName}</span>
              <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-label-sm text-on-surface-variant">
                {images.length} 张
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSelectDirectory}
              disabled={isLoading}
              className="glass-ghost-button"
          >
              <Icon name="folder" />
            更换目录
          </button>

            <div className="glass-input-group">
              <label htmlFor="interval" className="text-label-sm uppercase text-on-surface-variant">间隔</label>
            <input
                id="interval"
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
                className="w-20 bg-transparent text-center text-body-md text-primary outline-none"
            />
              <span className="text-label-sm text-on-surface-variant">ms</span>
          </div>

            <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
                className="glass-icon-button"
                aria-label="上一张"
                title="上一张"
            >
                <Icon name="previous" />
            </button>

            <button
              onClick={togglePlay}
                disabled={images.length <= 1}
                className={isPlaying ? 'glass-pause-button' : 'glass-play-button'}
            >
                <Icon name={isPlaying ? 'pause' : 'play'} />
              {isPlaying ? '暂停' : '播放'}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
                className="glass-icon-button"
                aria-label="下一张"
                title="下一张"
            >
                <Icon name="next" />
            </button>
          </div>

            <span className="rounded-full bg-white/10 px-4 py-2 text-label-sm text-on-surface-variant">
            {currentIndex + 1} / {images.length}
          </span>
          </div>
        </div>
      </header>

      <section className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-6">
        <div className="image-stage flex h-full w-full items-center justify-center">
        <img
            src={currentImage.url}
            alt={currentImage.name}
            className="max-h-full max-w-full rounded-lg object-contain shadow-[0_18px_80px_rgba(0,0,0,0.35)]"
          draggable={false}
        />
      </div>
      </section>

      <footer className="relative z-20 px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="glass-toolbar flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 truncate text-body-md text-on-surface-variant">{currentImage.name}</p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/5 sm:w-72">
        <div
              className="h-full rounded-full bg-secondary transition-all duration-300"
              style={{ width: `${progress}%` }}
        />
      </div>
        </div>
      </footer>
    </main>
  )
}
