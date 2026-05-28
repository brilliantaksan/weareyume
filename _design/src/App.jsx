// Main app — wires everything together. Tweaks panel exposes Hero variant.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "A",
  "accentColor": "#ff3d7a",
  "scribbleDensity": "regular",
  "showCursor": true,
  "showClouds": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Allow URL ?hero=A|B to override variant (used by compare.html iframes)
  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('hero');
    if (p === 'A' || p === 'B') setTweak('heroVariant', p);
  }, []);

  // Allow ?heroOnly=1 to hide nav and everything below hero (used by compare.html)
  const heroOnly = new URLSearchParams(window.location.search).get('heroOnly') === '1';

  // Apply accent CSS variable
  React.useEffect(() => {
    document.documentElement.style.setProperty('--hot-pink', t.accentColor);
  }, [t.accentColor]);

  // Toggle cursor
  React.useEffect(() => {
    document.body.style.cursor = t.showCursor ? 'none' : 'auto';
  }, [t.showCursor]);

  // Toggle scribble density
  React.useEffect(() => {
    document.body.dataset.scribbleDensity = t.scribbleDensity;
  }, [t.scribbleDensity]);

  // Toggle cloud animation (just adds/removes a class on body)
  React.useEffect(() => {
    document.body.classList.toggle('no-clouds', !t.showClouds);
  }, [t.showClouds]);

  return (
    <>
      <CrayonFilterHost />
      {t.showCursor && <CrayonCursor />}
      <ScribbleObserver />

      {!heroOnly && <Nav />}

      <main>
        {t.heroVariant === "A" ? <HeroA next={NEXT} /> : <HeroB next={NEXT} />}
        {!heroOnly && <>
          <Manifesto />
          <HowItWorks />
          <Upcoming />
          <Demos />
          <Gallery />
          <FAQ />
          <JoinCTA />
        </>}
      </main>
      {!heroOnly && <Footer />}

      <TweaksPanel title="Yu+Me · Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio
          label="Hero variant"
          value={t.heroVariant}
          options={["A", "B"]}
          onChange={(v) => setTweak('heroVariant', v)}
        />
        <p style={{ fontSize: 11, color: '#888', margin: '4px 0 12px', lineHeight: 1.4 }}>
          <strong>A</strong> — centered logo card · <strong>B</strong> — editorial spread w/ collage
        </p>

        <TweakSection label="Look" />
        <TweakColor
          label="Accent color"
          value={t.accentColor}
          options={['#ff3d7a', '#e91e63', '#7c3aed', '#0ea5e9', '#f97316']}
          onChange={(v) => setTweak('accentColor', v)}
        />
        <TweakRadio
          label="Scribble density"
          value={t.scribbleDensity}
          options={['minimal', 'regular', 'lots']}
          onChange={(v) => setTweak('scribbleDensity', v)}
        />

        <TweakSection label="Effects" />
        <TweakToggle
          label="Crayon cursor"
          value={t.showCursor}
          onChange={(v) => setTweak('showCursor', v)}
        />
        <TweakToggle
          label="Floating clouds"
          value={t.showClouds}
          onChange={(v) => setTweak('showClouds', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
