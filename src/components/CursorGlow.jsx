import { useEffect, useRef } from 'react'

// Soft spotlight that follows the mouse (desktop / hover devices only).
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const el = ref.current
    let raf = 0
    const move = e => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`
      })
    }
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: 'radial-gradient(closest-side, rgba(var(--accent-rgb), .10), transparent)' }}
    />
  )
}
