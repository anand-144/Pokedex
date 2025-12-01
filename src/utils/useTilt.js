// src/utils/tilt.js

export function applyTilt(el, maxTilt = 18) {
  if (!el) return;

  const glow = el.querySelector(".tilt-glow");

  const handleMove = (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotX = ((y - cy) / cy) * maxTilt;
    const rotY = ((x - cx) / cx) * -maxTilt;

    el.style.transform = `
      perspective(900px)
      rotateX(${rotX}deg)
      rotateY(${rotY}deg)
      scale(1.08)
    `;

    if (glow) {
      glow.style.opacity = "1";
      glow.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
          rgba(255, 255, 200, 0.55),
          transparent 70%)
      `;
    }
  };

  const reset = () => {
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    if (glow) glow.style.opacity = "0";
  };

  el.addEventListener("mousemove", handleMove);
  el.addEventListener("mouseleave", reset);
}
