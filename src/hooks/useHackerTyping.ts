import { useState, useCallback } from 'react'

export type TypingState = 'idle' | 'generating' | 'ready' | 'typing' | 'completed'

export interface HackerTypingState {
  generatedText: string
  displayedText: string
  currentPosition: number
  typingState: TypingState
  error: string | null
  isGenerating: boolean
}

export interface HackerTypingActions {
  setGeneratedText: (text: string) => void
  addCharacter: () => boolean
  addMultipleCharacters: (count: number) => number
  reset: () => void
  setError: (error: string | null) => void
  setGenerating: (isGenerating: boolean) => void
  skipToEnd: () => void
}

export const useHackerTyping = (): HackerTypingState & HackerTypingActions => {
  const [generatedText, setGeneratedTextState] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [currentPosition, setCurrentPosition] = useState(0)
  const [typingState, setTypingState] = useState<TypingState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setGenerating] = useState(false)

  const setGeneratedText = useCallback((text: string) => {
    setGeneratedTextState(text)
    setDisplayedText('')
    setCurrentPosition(0)
    setTypingState(text ? 'ready' : 'idle')
    setError(null)
  }, [])

  const addCharacter = useCallback((): boolean => {
    if (typingState !== 'ready' && typingState !== 'typing') {
      return false
    }

    if (currentPosition >= generatedText.length) {
      setTypingState('completed')
      return false
    }

    const nextChar = generatedText[currentPosition]
    setDisplayedText(prev => prev + nextChar)
    setCurrentPosition(prev => prev + 1)
    setTypingState('typing')

    if (currentPosition + 1 >= generatedText.length) {
      setTypingState('completed')
    }

    return true
  }, [generatedText, currentPosition, typingState])

  const addMultipleCharacters = useCallback((count: number): number => {
    if (typingState !== 'ready' && typingState !== 'typing') {
      return 0
    }

    if (currentPosition >= generatedText.length) {
      setTypingState('completed')
      return 0
    }

    // 実際に追加できる文字数を計算（テキストの終端を考慮）
    const remainingChars = generatedText.length - currentPosition
    const actualCount = Math.min(count, remainingChars)
    
    if (actualCount <= 0) {
      setTypingState('completed')
      return 0
    }

    // 指定された文字数分のテキストを取得
    const textToAdd = generatedText.slice(currentPosition, currentPosition + actualCount)
    
    // 状態を一度に更新
    setDisplayedText(prev => prev + textToAdd)
    setCurrentPosition(prev => prev + actualCount)
    setTypingState('typing')

    // すべての文字を追加し終わったかチェック
    if (currentPosition + actualCount >= generatedText.length) {
      setTypingState('completed')
    }

    return actualCount
  }, [generatedText, currentPosition, typingState])

  const reset = useCallback(() => {
    setGeneratedTextState('')
    setDisplayedText('')
    setCurrentPosition(0)
    setTypingState('idle')
    setError(null)
    setGenerating(false)
  }, [])

  const skipToEnd = useCallback(() => {
    if (generatedText) {
      setDisplayedText(generatedText)
      setCurrentPosition(generatedText.length)
      setTypingState('completed')
    }
  }, [generatedText])

  return {
    generatedText,
    displayedText,
    currentPosition,
    typingState,
    error,
    isGenerating,
    setGeneratedText,
    addCharacter,
    addMultipleCharacters,
    reset,
    setError,
    setGenerating,
    skipToEnd
  }
}