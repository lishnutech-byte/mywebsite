import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  let mx = 0, my = 0, fx = 0, fy = 0

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Only on desktop
    if (window.innerWidth <= 768) return

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    // Smooth follower
    let animId
    const animate = () => {
      fx += (mx - fx) * 0.13
      fy += (my - fy) * 0.13
      follower.style.left = fx + 'px'
      follower.style.top = fy + 'px'
      animId = requestAnimationFrame(animate)
    }
    animate()

    // Grow on hover
    const interactables = document.querySelectorAll('a, button, .svc-row, .tl-card, .lt-team-card, .num-card, .tool-item')
    const grow = () => { cursor.classList.add('big'); follower.classList.add('big') }
    const shrink = () => { cursor.classList.remove('big'); follower.classList.remove('big') }
    interactables.forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
