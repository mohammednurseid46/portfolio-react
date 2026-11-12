import { useEffect, useRef } from 'react'

// Interactive canvas background. Nodes drift, link up when close and
// react to the mouse. "neural" mode adds pulses travelling along links.
export default function Background({ mode, theme, accent }) {
  const ref = useRef(null)

  useEffect(() => {
    if (mode === 'minimal') return undefined
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const neural = mode === 'neural'
    const light = theme === 'light'
    const rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '0,229,255'

    let w = 0, h = 0, raf = 0, nodes = []
    const mouse = { x: -9999, y: -9999 }
    const LINK = neural ? 150 : 130
    const baseAlpha = light ? 0.5 : 0.8

    const init = () => {
      const count = Math.min(neural ? 90 : 110, Math.floor((w * h) / 15000))
      const speed = neural ? 0.25 : 0.4
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.6 + 0.8,
      }))
    }
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    const draw = time => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          // gentle attraction towards the cursor
          const dx = mouse.x - n.x, dy = mouse.y - n.y
          const d2 = dx * dx + dy * dy
          if (d2 < 22500 && d2 > 1) { n.x += dx * 0.004; n.y += dy * 0.004 }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.35 * baseAlpha
            ctx.strokeStyle = `rgba(${rgb},${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            if (neural && !reduce) {
              const t = ((time * 0.0003) + (i * 7 + j * 3) * 0.137) % 1
              ctx.fillStyle = `rgba(${rgb},${Math.min(1, alpha * 3)})`
              ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, 1.6, 0, 6.283); ctx.fill()
            }
          }
        }
        ctx.fillStyle = `rgba(${rgb},${0.7 * baseAlpha})`
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill()
      }
      // links to the cursor
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y)
        if (d < 160) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - d / 160) * 0.6 * baseAlpha})`
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [mode, theme, accent])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="grid-dots absolute inset-0 opacity-50" />
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(var(--accent-rgb),.55), transparent)' }}
      />
      {mode !== 'minimal' && <canvas ref={ref} className="absolute inset-0" />}
    </div>
  )
}
