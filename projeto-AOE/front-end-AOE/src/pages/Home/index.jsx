import './style.css'

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">Atlantic Offshore Energy</span>
          <h1>Energia offshore com foco em segurança e eficiência.</h1>
          <p>
            A Atlantic Offshore Energy lidera operações marítimas sustentáveis,
            garantindo desempenho contínuo, gestão de risco e proteção de pessoas.
          </p>
        </div>

        <div className="hero-highlights">
          <div className="highlight-card">
            <h3>Missão</h3>
            <p>Fornecer energia com excelência operacional e responsabilidade ambiental.</p>
          </div>
          <div className="highlight-card">
            <h3>Visão</h3>
            <p>Ser referência em segurança e tecnologia offshore no Atlântico.</p>
          </div>
        </div>
      </section>

      <section className="safety-section">
        <div className="section-header">
          <h2>Indicadores gerais de segurança</h2>
          <p>Monitoramos diariamente a performance de segurança de nossas plataformas.</p>
        </div>
        <div className="safety-cards">
          <article className="safety-card">
            <span className="card-value">245</span>
            <p>dias sem acidentes</p>
          </article>
          <article className="safety-card">
            <span className="card-value">8</span>
            <p>plataformas ativas</p>
          </article>
          <article className="safety-card">
            <span className="card-value">97%</span>
            <p>inspeções concluídas no prazo</p>
          </article>
        </div>
      </section>

      <section className="map-section">
        <div className="section-header">
          <h2>Mapa de localização das plataformas ativas</h2>
          <p>Veja a distribuição das operações offshore em áreas estratégicas do Atlântico.</p>
        </div>

        <div className="map-grid">
          <div className="map-list">
            <h3>Plataformas ativas</h3>
            <ul>
              <li>
                <strong>AOE-01</strong> – Plataforma de produção principal.
              </li>
              <li>
                <strong>AOE-05</strong> – Unidade de suporte logístico.
              </li>
              <li>
                <strong>AOE-12</strong> – Plataforma de manutenção.
              </li>
              <li>
                <strong>AOE-18</strong> – Centro de operações e segurança.
              </li>
            </ul>
          </div>

          <div className="map-frame">
            <iframe
              title="Mapa das plataformas ativas"
              src="https://maps.google.com/maps?q=offshore%20oil%20rigs&t=&z=5&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
