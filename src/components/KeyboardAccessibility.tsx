'use client'

import { useEffect } from 'react'

export interface KeyboardAccessibilityProps {
  onEsc?: (e: KeyboardEvent) => void
  onEnter?: (e: KeyboardEvent) => void
  onKeydown?: (e: KeyboardEvent) => void
  preventDefault?: boolean
}

const KeyboardAccessibility = ({
  onEsc,
  onEnter,
  onKeydown,
  preventDefault,
}: KeyboardAccessibilityProps) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      onKeydown?.(e)

      if (e.key === 'Escape') {
        onEsc?.(e)
      } else if (e.key === 'Enter') {
        onEnter?.(e)
      }

      preventDefault && e.preventDefault()
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return null
}

export default KeyboardAccessibility
