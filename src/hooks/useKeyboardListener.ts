import { useEffect, useCallback, useRef } from 'react'

export interface KeyboardListenerOptions {
  onKeyPress: () => void
  isEnabled: boolean
  excludeKeys?: string[]
  targetElement?: HTMLElement | null
}

export const useKeyboardListener = ({
  onKeyPress,
  isEnabled,
  excludeKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Tab', 'Alt', 'Control', 'Shift', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock'],
  targetElement = null
}: KeyboardListenerOptions) => {
  const lastKeyPressTime = useRef<number>(0)
  const THROTTLE_MS = 50

  const handleKeyDown = useCallback((event: Event) => {
    const keyboardEvent = event as KeyboardEvent
    if (!isEnabled) return

    const now = Date.now()
    if (now - lastKeyPressTime.current < THROTTLE_MS) {
      return
    }

    if (excludeKeys.includes(keyboardEvent.key)) {
      return
    }

    if (keyboardEvent.ctrlKey || keyboardEvent.metaKey || keyboardEvent.altKey) {
      return
    }

    if (keyboardEvent.target instanceof HTMLInputElement || 
        keyboardEvent.target instanceof HTMLTextAreaElement || 
        keyboardEvent.target instanceof HTMLSelectElement) {
      return
    }

    if (keyboardEvent.target && (keyboardEvent.target as HTMLElement).contentEditable === 'true') {
      return
    }

    keyboardEvent.preventDefault()
    lastKeyPressTime.current = now
    onKeyPress()
  }, [isEnabled, excludeKeys, onKeyPress])

  useEffect(() => {
    if (!isEnabled) return

    const element = targetElement || document
    
    element.addEventListener('keydown', handleKeyDown)
    
    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, isEnabled, targetElement])
}