import { useEffect } from 'react'

interface TextPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  text: string
  title?: string
}

export const TextPreviewModal = ({ isOpen, onClose, text, title = 'Generated Text' }: TextPreviewModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-mono">
      <div 
        className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-black border border-green-400/50 rounded-lg shadow-xl shadow-green-400/20 max-w-4xl max-h-[80vh] w-full mx-4 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-green-400/30">
          <h2 className="text-lg font-semibold text-green-400">
            <span className="text-cyan-400">{'>'}</span> {title}
          </h2>
          <button
            onClick={onClose}
            className="text-green-400/70 hover:text-green-400 hover:shadow-lg hover:shadow-green-400/50 transition-all p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono leading-relaxed">
            {text || 'NO_DATA_AVAILABLE'}
          </pre>
        </div>
        
        <div className="p-4 border-t border-green-400/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black border border-green-400 text-green-400 hover:bg-green-400/10 hover:shadow-lg hover:shadow-green-400/50 rounded-md transition-all font-bold"
          >
            {'>>>'} CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}