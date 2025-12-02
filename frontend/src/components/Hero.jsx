// Hero.jsx
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const containerRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      }
    })

    tl.fromTo(
      logo,
      { scale: 1.4, yPercent: -50, autoAlpha: 0.5 }, 
      { scale: 1.2, yPercent: -20, autoAlpha: 0.3, ease: "power1.out" } 
    )
    .to(logo, {
      scale: 0.2,
      yPercent: 50,
      autoAlpha: 1,
      ease: "power1.inOut"
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <img
        src="/src/assets/images/home.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="pokemon hero"
      />
      <div className="absolute inset-0"></div>

      <img
        ref={logoRef}
        src="/src/assets/images/logo.png"
        className="absolute left-1/2 top-1/2 
        -translate-x-1/2 -translate-y-1/2 
        w-[60%] pointer-events-none opacity-100"
        alt="Pokemon Logo"
      />
    </div>
  )
}

export default Hero
