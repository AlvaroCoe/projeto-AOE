import './style.css'

export default function Producao() {
  return (
    <div className="producao-container">
      <h1>Monitoramento de produção diária</h1>
      <p className="producao-category">Categoria: Exibição de dados (API)</p>

      <section className="producao-intro">
        <p>
          Tela que consome dados da API do Spring Boot para listar o volume de extração diária de cada plataforma,
          em barris de petróleo e m³ de gás natural, destacando metas atingidas e indicadores de desempenho.
        </p>
      </section>

      <section className="producao-data">
        <h2>Resumo de produção</h2>
        <div className="producao-grid">
          <div className="producao-card">
            <h3>AOE-01</h3>
            <p>Petróleo diário: <strong>130.500 barris</strong></p>
            <p>Gás diário: <strong>4.800 m³</strong></p>
            <p className="meta">Meta atingida: <strong>Sim</strong></p>
          </div>
          <div className="producao-card">
            <h3>AOE-02</h3>
            <p>Petróleo diário: <strong>98.200 barris</strong></p>
            <p>Gás diário: <strong>3.250 m³</strong></p>
            <p className="meta">Meta atingida: <strong>Não</strong></p>
          </div>
          <div className="producao-card">
            <h3>AOE-03</h3>
            <p>Petróleo diário: <strong>145.700 barris</strong></p>
            <p>Gás diário: <strong>5.100 m³</strong></p>
            <p className="meta">Meta atingida: <strong>Sim</strong></p>
          </div>
        </div>
      </section>

      <section className="producao-highlights">
        <h2>Destaques</h2>
        <ul>
          <li>Meta de petróleo superior a 120.000 barris atingida em duas plataformas.</li>
          <li>Monitoramento em tempo real favorece decisões rápidas de produção.</li>
          <li>Visão consolidada do volume diário de gás natural em m³.</li>
        </ul>
      </section>
    </div>
  )
}

