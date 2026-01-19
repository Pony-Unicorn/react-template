import { useCallback, useEffect, useState } from 'react'

export default function useScroll(threshold: number = 0) {
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    let ticking = false

    return () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }
  }, [threshold])

  useEffect(() => {
    setScrolled(window.scrollY > threshold)

    const handleScroll = onScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onScroll, threshold])

  return scrolled
}
