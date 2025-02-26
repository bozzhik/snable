import {useState} from 'react'

export function useCopy(timeout = 1500) {
  const [tooltip, setTooltip] = useState('')

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setTooltip('Copied')
      setTimeout(() => setTooltip(''), timeout)
    } catch (err) {
      setTooltip('Failed to copy!')
    }
  }

  return {tooltip, copyToClipboard, setTooltip}
}
