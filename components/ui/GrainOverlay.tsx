'use client'

// Film grain + scanline overlay for premium texture
// Pure CSS — zero JS, zero performance impact
export default function GrainOverlay() {
  return (
    <>
      {/* Film grain via SVG turbulence filter */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9000]"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[8999]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  )
}
