// Crayon scribble shapes. Simple geometric primitives + SVG turbulence filter
// to fake the crayon/spray-paint texture. Each component renders one scribble
// positioned absolutely via the `style` prop, and draws-on-scroll via the
// `.scribble.drawn` class toggle (handled by IntersectionObserver in Effects.jsx).

const SCRIBBLE_STROKE = 6;

// Global filter host — render once near root. Provides the crayon turbulence filter.
function CrayonFilterHost() {
  return (
    <svg className="crayon-filter-host" aria-hidden="true">
      <defs>
        <filter id="crayon" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>
        <filter id="crayon-rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>
      </defs>
    </svg>
  );
}

// Helper to wrap a path / shape with stroke-dasharray for draw-on-scroll.
function ScribbleSvg({ size = 140, viewBox = "0 0 100 100", color = "var(--hot-pink)", filter = "url(#crayon)", strokeWidth = SCRIBBLE_STROKE, children }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} style={{ overflow: "visible" }}>
      <g
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={filter}
      >
        {children}
      </g>
    </svg>
  );
}

/* Star — 5-pointed crayon star, drawn as one path */
function StarScribble(props) {
  return (
    <ScribbleSvg {...props}>
      <path d="M50 8 L60 38 L92 38 L66 56 L76 86 L50 68 L24 86 L34 56 L8 38 L40 38 Z" />
    </ScribbleSvg>
  );
}

/* Cross / sparkle / 4-point star */
function CrossScribble(props) {
  return (
    <ScribbleSvg {...props}>
      <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" />
    </ScribbleSvg>
  );
}

/* Swirly heart / loop loop shape — like the top-right of the profile pic */
function SwirlScribble(props) {
  return (
    <ScribbleSvg {...props} viewBox="0 0 120 100">
      <path d="M10 50 C 10 20, 50 20, 50 50 C 50 80, 10 80, 30 50 C 50 20, 90 20, 90 50 C 90 80, 50 80, 70 50 C 90 20, 115 30, 110 60" />
    </ScribbleSvg>
  );
}

/* Squiggly arrow — for annotations */
function ArrowScribble({ size = 140, color = "var(--hot-pink)", flip = false, ...props }) {
  return (
    <ScribbleSvg size={size} color={color} {...props} viewBox="0 0 140 80">
      <path d={flip
        ? "M130 40 Q 100 5, 70 40 T 10 40 M 25 25 L 10 40 L 25 55"
        : "M10 40 Q 40 5, 70 40 T 130 40 M 115 25 L 130 40 L 115 55"} />
    </ScribbleSvg>
  );
}

/* Circle wobble */
function CircleScribble(props) {
  return (
    <ScribbleSvg {...props}>
      <circle cx="50" cy="50" r="40" />
    </ScribbleSvg>
  );
}

/* Underline / squiggle */
function UnderlineScribble({ size = 200, color = "var(--hot-pink)", ...props }) {
  return (
    <ScribbleSvg size={size} color={color} {...props} viewBox="0 0 200 30" strokeWidth={5}>
      <path d="M5 18 Q 30 5, 55 18 T 105 18 T 155 18 T 195 18" />
    </ScribbleSvg>
  );
}

/* Spiral */
function SpiralScribble(props) {
  return (
    <ScribbleSvg {...props}>
      <path d="M50 50 m-3 0 a 3 3 0 1 1 6 0 a 6 6 0 1 1 -12 0 a 12 12 0 1 1 24 0 a 20 20 0 1 1 -40 0 a 30 30 0 1 1 60 0 a 38 38 0 1 1 -76 0" />
    </ScribbleSvg>
  );
}

/* Hand-written date label — uses Lastik with crayon filter */
function ScribbleDate({ children, color = "var(--hot-pink)", size = 32, rotate = -8, style }) {
  return (
    <span style={{
      fontFamily: 'var(--serif)',
      fontSize: size,
      color,
      filter: "url(#crayon-rough)",
      transform: `rotate(${rotate}deg)`,
      display: "inline-block",
      ...style
    }}>{children}</span>
  );
}

Object.assign(window, {
  CrayonFilterHost,
  StarScribble, CrossScribble, SwirlScribble, ArrowScribble,
  CircleScribble, UnderlineScribble, SpiralScribble,
  ScribbleDate,
});
