import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ImagePreviewProps {
  src: string
  alt?: string
  onClose: () => void
}

export function ImagePreview({ src, alt, onClose }: ImagePreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[95%] max-w-[80%] object-contain"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      />
    </div>,
    document.body,
  )
}
