import { useEffect } from 'react'
import { X } from 'lucide-react'

interface VideoModalProps {
  videoId: string
  title: string
  onClose: () => void
}

export function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/90"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Chiudi video"
        className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors"
      >
        <X className="h-7 w-7" />
      </button>

      <div
        className="w-full max-w-4xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
