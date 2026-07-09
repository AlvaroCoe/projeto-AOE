import { useState } from 'react'
import './style.css'

export default function Contato() {
  const [mensagemEnviada, setMensagemEnviada] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setMensagemEnviada(true)
    e.target.reset()

    setTimeout(() => {
      setMensagemEnviada(false)
    }, 3000)
  }

  return (
    <div className="contato-container">
      <h1>Contato e Suporte de Emergência Institucional</h1>
      
      <section className="secao-canais">
        <h2>Canais de Comunicação - Bases em Terra</h2>
        <p className="descricao">Comunicação direta com nossas bases operacionais</p>
        
        <div className="bases-grid">
          <div className="card-base">
            <h3>Macaé - RJ</h3>
            <div className="info-item">
              <span className="label">Telefone:</span>
              <a href="tel:+552127000000">(21) 2700-0000</a>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <a href="mailto:contato.macae@aoe.com.br">contato.macae@aoe.com.br</a>
            </div>
            <div className="info-item">
              <span className="label">Endereço:</span>
              <p>Avenida Atlântica, 500 - Macaé, RJ</p>
            </div>
            <div className="info-item">
              <span className="label">Horário:</span>
              <p>Seg-Sex: 7h-17h</p>
            </div>
          </div>

          <div className="card-base">
            <h3>Santos - SP</h3>
            <div className="info-item">
              <span className="label">Telefone:</span>
              <a href="tel:+551338000000">(13) 3800-0000</a>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <a href="mailto:contato.santos@aoe.com.br">contato.santos@aoe.com.br</a>
            </div>
            <div className="info-item">
              <span className="label">Endereço:</span>
              <p>Avenida da Praia, 1200 - Santos, SP</p>
            </div>
            <div className="info-item">
              <span className="label">Horário:</span>
              <p>Seg-Sex: 7h-17h</p>
            </div>
          </div>

          <div className="card-base">
            <h3>Rio de Janeiro - RJ</h3>
            <div className="info-item">
              <span className="label">Telefone:</span>
              <a href="tel:+552140000000">(21) 4000-0000</a>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <a href="mailto:contato.rio@aoe.com.br">contato.rio@aoe.com.br</a>
            </div>
            <div className="info-item">
              <span className="label">Endereço:</span>
              <p>Avenida Brasil, 3000 - Rio de Janeiro, RJ</p>
            </div>
            <div className="info-item">
              <span className="label">Horário:</span>
              <p>Seg-Sex: 7h-17h</p>
            </div>
          </div>
        </div>
      </section>

      <section className="secao-contingencia">
        <h2>Telefones de Contingência Internacional</h2>
        <p className="descricao">Suporte de emergência disponível 24/7</p>
        
        <div className="contingencia-grid">
          <div className="card-contingencia">
            <h3>Emergência Global</h3>
            <div className="numero-emergencia">+55 21 99999-9999</div>
            <p className="tipo">Disponível 24 horas/7 dias</p>
          </div>

          <div className="card-contingencia">
            <h3>Suporte Técnico Internacional</h3>
            <div className="numero-emergencia">+1 (305) 800-0000</div>
            <p className="tipo">Suporte em inglês</p>
          </div>

          <div className="card-contingencia">
            <h3>Operações de Contingência</h3>
            <div className="numero-emergencia">+55 11 98888-8888</div>
            <p className="tipo">Operações críticas</p>
          </div>
        </div>
      </section>

      <section className="secao-formulario">
        <h2>Envie sua Mensagem</h2>
        {mensagemEnviada && (
          <div className="mensagem-sucesso">
            ✓ Mensagem enviada com sucesso!
          </div>
        )}
        <form className="form-contato" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" id="nome" name="nome" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" id="telefone" name="telefone" />
          </div>

          <div className="form-group">
            <label htmlFor="assunto">Assunto</label>
            <select id="assunto" name="assunto" required>
              <option value="">Selecione um assunto</option>
              <option value="geral">Contato Geral</option>
              <option value="emergencia">Emergência</option>
              <option value="tecnico">Suporte Técnico</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows="6" required></textarea>
          </div>

          <button type="submit" className="btn-enviar">Enviar Mensagem</button>
        </form>
      </section>
    </div>
  )
}