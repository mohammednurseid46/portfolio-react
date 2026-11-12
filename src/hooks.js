import { useEffect, useState } from 'react'

// useState that survives page reloads (safe if storage is blocked).
export function useStored(key, initial, allowed) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved && (!allowed || allowed.includes(saved))) return saved
    } catch { /* storage unavailable */ }
    return initial
  })
  useEffect(() => {
    try { localStorage.setItem(key, value) } catch { /* ignore */ }
  }, [key, value])
  return [value, setValue]
}

// Types and erases a list of phrases forever. Pass a stable array.
export function useTypewriter(phrases, { type = 75, erase = 35, hold = 1800 } = {}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = phrases[index % phrases.length]
    let timer
    if (!deleting && text === full) {
      timer = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      timer = setTimeout(() => { setDeleting(false); setIndex(i => i + 1) }, 300)
    } else {
      timer = setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? erase : type,
      )
    }
    return () => clearTimeout(timer)
  }, [text, deleting, index, phrases, type, erase, hold])

  return text
}
