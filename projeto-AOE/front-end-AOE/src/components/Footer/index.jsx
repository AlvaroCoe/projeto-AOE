import './style.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Atlantic Offshore Energy</h3>
            <p>Operações marítimas sustentáveis com excelência em segurança.</p>
          </div>

          <div className="footer-section">
            <h4>Navegação</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/quem-somos">Quem Somos</a></li>
              <li><a href="/hse">HSE</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <p>Telefone: +55 21 2700-0000</p>
            <p>Email: contato@aoe.com.br</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Atlantic Offshore Energy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
