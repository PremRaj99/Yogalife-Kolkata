import { Navigation, Brand } from "./navigation";
import { WellnessArt } from "./wellness-art";
import { ComponentPlayground } from "./component-playground";
import { ProgramExplorer } from "./program-explorer";

export function DesignSystem() {
  return (
    <div id="top">
      <Navigation />
      <main id="main">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow">
                Yogalife Kolkata / Design system 01
              </span>
              <h1>
                Rooted in tradition.
                <br />
                Room to grow.
              </h1>
              <p className="hero-copy muted">
                A warm, considered design language for a more mindful way of
                living. Simple by nature. Welcoming to everyone.
              </p>
              <div className="row">
                <a className="button" href="#foundations">
                  Explore the foundations <span aria-hidden="true">↗</span>
                </a>
                <a className="secondary-button" href="#components">
                  See it in practice
                </a>
              </div>
              <div className="hero-foot">
                <span>INDIAN ROOTS</span>
                <span>CONTEMPORARY CLARITY</span>
                <span>EVERYDAY WELLNESS</span>
              </div>
            </div>
            <div className="hero-art">
              <WellnessArt />
              <div className="art-caption">
                A little stillness. A new beginning.
              </div>
            </div>
          </div>
        </section>
        <div className="container" id="principles">
          <div className="principles">
            {[
              ["01 / Traditional", "Wisdom, made welcoming"],
              ["02 / Minimal", "Only what matters"],
              ["03 / Organic", "Softness in every detail"],
              ["04 / Inspiring", "Space for your own journey"],
            ].map(([title, desc]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <section id="foundations" className="section">
          <div className="container">
            <div className="section-intro">
              <div>
                <span className="eyebrow">01 / Colour & atmosphere</span>
                <h2>
                  White space.
                  <br />
                  Warmth. A grounding green.
                </h2>
              </div>
              <p className="muted">
                A 60 / 30 / 10 balance. White brings clarity, cream brings
                warmth, and forest green gives important moments their voice.
              </p>
            </div>
            <div className="palette">
              <div className="swatch">
                <strong>60%</strong>
                <div>
                  Pure white<small>#FFFFFF · Space & clarity</small>
                </div>
              </div>
              <div className="swatch cream">
                <strong>30%</strong>
                <div>
                  Warm cream<small>#FCF4E8 · Comfort & connection</small>
                </div>
              </div>
              <div className="swatch forest">
                <strong>10%</strong>
                <div>
                  Forest green<small>#234D3C · Focus & intention</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="typography" className="section cream">
          <div className="container">
            <div className="section-intro">
              <div>
                <span className="eyebrow">02 / Typography</span>
                <h2>A clear, human voice.</h2>
              </div>
              <p className="muted">
                Commissioner, from Google Fonts. Confident headings and
                comfortable reading, with a warmth that feels familiar.
              </p>
            </div>
            <div className="type-grid">
              <div>
                <div className="large-letter">Aa</div>
                <h3>Commissioner</h3>
                <p className="muted">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  0123456789 & @ ! ?
                </p>
                <div className="row">
                  <span>Regular 400</span>
                  <span style={{ fontWeight: 500 }}>Medium 500</span>
                  <span style={{ fontWeight: 600 }}>Semibold 600</span>
                </div>
              </div>
              <div>
                <div className="type-sample">
                  <p style={{ fontSize: 44, lineHeight: 1.1 }}>
                    Find your balance.
                  </p>
                  <small>H1 · 36–72</small>
                </div>
                <div className="type-sample">
                  <p style={{ fontSize: 32 }}>A slower rhythm.</p>
                  <small>H2 · 32–48</small>
                </div>
                <div className="type-sample">
                  <p style={{ fontSize: 24 }}>Begin where you are.</p>
                  <small>H3 · 24–32</small>
                </div>
                <div className="type-sample">
                  <p>Your practice grows with you.</p>
                  <small>Body · 16–18</small>
                </div>
                <div className="type-sample">
                  <p className="small">Small steps are still steps.</p>
                  <small>Small · 14</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="spacing" className="section">
          <div className="container">
            <div className="section-intro">
              <div>
                <span className="eyebrow">Space & rhythm</span>
                <h2>Let the content breathe.</h2>
              </div>
              <p className="muted">
                A 1248px content width. Twelve columns on desktop, eight on
                tablet, four on mobile. Spacious by default.
              </p>
            </div>
            <div className="two-col">
              <div className="space-demo">
                {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
                  <div key={n}>
                    <i style={{ height: n }} />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="muted">
                  Sections: 96–120px desktop · 56–64px mobile/tablet
                  <br />
                  Container gutters: 16 / 24 / 32px
                  <br />
                  Surface padding: 16 / 24 / 32px
                </p>
                <p className="small muted">
                  Left-aligned content for clarity. Centered text reserved for
                  short moments of reflection and feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ComponentPlayground />
        <section id="programs" className="section cream">
          <div className="container">
            <div className="section-intro">
              <div>
                <span className="eyebrow">05 / Discovery pattern</span>
                <h2>
                  Find a practice
                  <br />
                  that feels like you.
                </h2>
              </div>
              <p className="muted">
                Working search, filters and pagination. Sample content shows how
                future yoga and wellness listings will feel.
              </p>
            </div>
            <ProgramExplorer />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <p className="small muted" style={{ margin: 0 }}>
            Yogalife Kolkata · A foundation for mindful experiences.
          </p>
          <a className="secondary-button small" href="#top">
            Back to the beginning ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
