import { useState, useRef, useEffect, useCallback } from 'react'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']

function getFiles(dirHandle: FileSystemDirectoryHandle): AsyncIterable<FileSystemFileHandle> {
  async function* files(): AsyncGenerator<FileSystemFileHandle> {
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file') {
        const name = entry.name.toLowerCase()
        if (IMAGE_EXTENSIONS.some(ext => name.endsWith(ext))) {
          yield entry as FileSystemFileHandle
        }
      } else if (entry.kind === 'directory') {
        yield* filesInDirectory(entry as FileSystemDirectoryHandle)
      }
    }
  }

  async function* filesInDirectory(dir: FileSystemDirectoryHandle): AsyncGenerator<FileSystemFileHandle> {
    for await (const entry of dir.values()) {
      if (entry.kind === 'file') {
        const name = entry.name.toLowerCase()
        if (IMAGE_EXTENSIONS.some(ext => name.endsWith(ext))) {
          yield entry as FileSystemFileHandle
        }
      } else if (entry.kind === 'directory') {
        yield* filesInDirectory(entry as FileSystemDirectoryHandle)
      }
    }
  }

  return files()
}

export default function App() {
  const [images, setImages] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [interval, setIntervalTime] = useState(3000)
  const [fileName, setFileName] = useState('')
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

  const handleSelectDirectory = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker()
      const fileHandles: FileSystemFileHandle[] = []

      for await (const fileHandle of getFiles(dirHandle)) {
        fileHandles.push(fileHandle)
      }

      fileHandles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

      const urls = await Promise.all(
        fileHandles.map(async (fh) => {
          const file = await fh.getFile()
          return URL.createObjectURL(file)
        })
      )

      setImages(urls)
      setCurrentIndex(0)
      setFileName(dirHandle.name)
      stopPlaying()
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Failed to select directory:', err)
      }
    }
  }

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(images.length - 1, prev + 1))
  }

  const togglePlay = () => {
    if (isPlaying) {
      stopPlaying()
    } else {
      setIsPlaying(true)
    }
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="mb-8">
            <svg className="mx-auto h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">图片浏览器</h1>
          <p className="text-gray-400 mb-8">选择一个包含图片的目录开始浏览</p>
          <button
            onClick={handleSelectDirectory}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition-colors cursor-pointer"
          >
            选择目录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSelectDirectory}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors cursor-pointer"
          >
            更换目录
          </button>
          <span className="text-gray-300 text-sm">{fileName}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">间隔:</label>
            <input
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
              className="w-20 px-2 py-1 bg-gray-700 rounded text-sm text-center"
            />
            <span className="text-sm text-gray-500">ms</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 rounded text-sm transition-colors cursor-pointer"
            >
              ‹ 上一张
            </button>

            <button
              onClick={togglePlay}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPlaying ? '⏸ 暂停' : '▶ 播放'}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 rounded text-sm transition-colors cursor-pointer"
            >
              下一张 ›
            </button>
          </div>

          <span className="text-gray-400 text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Image display */}
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={fileName}
          className="max-w-full max-h-full object-contain rounded shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-800">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${images.length > 1 ? ((currentIndex + 1) / images.length) * 100 : 100}%` }}
        />
      </div>
    </div>
  )
}
