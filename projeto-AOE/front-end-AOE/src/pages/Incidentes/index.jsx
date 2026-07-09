import { useState, useEffect } from 'react'
import './style.css'
import api from '../../services/api'

export default function Incidentes() {
  const [formData, setFormData] = useState({
    gravidade: '',
    data: '',
    hora: '',
    plataforma: '',
    descricao: '',
    acoesImediatas: ''
  })

  const [enviando, setEnviando] = useState(false)
  const [incidentes, setIncidentes] = useState([]) // LISTA DE INCIDENTES
  const [loadingLista, setLoadingLista] = useState(true) // LOADING DA LISTA

  const [mensagem, setMensagem] = useState({
    tipo: '',
    texto: ''
  })

  const niveisGravidade = [
    { valor: 'critica', label: 'Crítica - Risco imediato à segurança' },
    { valor: 'alta', label: 'Alta - Risco significativo' },
    { valor: 'media', label: 'Média - Risco moderado' },
    { valor: 'baixa', label: 'Baixa - Risco mínimo' }
  ]

  // Função para carregar a lista de incidentes do Back-end
  async function fetchIncidentes() {
    try {
      setLoadingLista(true)
      const res = await api.get('/api/incidentes')
      setIncidentes(res.data)
    } catch (err) {
      console.error("Erro ao carregar lista de incidentes:", err)
    } finally {
      setLoadingLista(false)
    }
  }

  // Busca os dados assim que a tela abre
  useEffect(() => {
    fetchIncidentes()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const limparFormulario = () => {
    setFormData({
      gravidade: '',
      data: '',
      hora: '',
      plataforma: '',
      descricao: '',
      acoesImediatas: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.gravidade ||
      !formData.data ||
      !formData.hora ||
      !formData.plataforma ||
      !formData.descricao ||
      !formData.acoesImediatas
    ) {
      setMensagem({
        tipo: 'erro',
        texto: 'Preencha todos os campos obrigatórios.'
      })
      return
    }

    setEnviando(true)
    setMensagem({ tipo: '', texto: '' })

    try {
      const response = await api.post('/api/incidentes', {
        gravidade: formData.gravidade,
        data: formData.data,
        hora: formData.hora,
        plataforma: formData.plataforma,
        descricao: formData.descricao,
        acoesImediatas: formData.acoesImediatas
      })

      if (response.status === 200 || response.status === 201) {
        setMensagem({
          tipo: 'sucesso',
          texto: `Incidente registrado com sucesso!`
        })
        limparFormulario()
        fetchIncidentes() // ATUALIZA A LISTA APÓS CADASTRAR UM NOVO!
      }

    } catch (error) {
      console.error(error)
      setMensagem({
        tipo: 'erro',
        texto: 'Erro ao registrar incidente.'
      })
    } finally {
      setEnviando(false)
    }
  }

  function formatarData(dataStr) {
    if (!dataStr) return '-'
    const d = new Date(dataStr)
    if (Number.isNaN(d.getTime())) return dataStr
    return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  return (
    <div className="incidentes-container">
      <header className="incidentes-header">
        <h1>Registro de Incidentes Operacionais</h1>
        <p className="categoria">Formulário Crítico para Reporte de Anomalias ou Acidentes</p>
      </header>

      <main className="incidentes-main">
        <section className="formulario-section">
          <div className="alerta-critico">
            <strong>⚠️ Atenção:</strong> Este formulário é crítico para a segurança operacional. Todos os campos devem ser preenchidos.
          </div>

          {mensagem.texto && (
            <div className={`mensagem mensagem-${mensagem.tipo}`}>
              {mensagem.texto}
            </div>
          )}

          <form className="incidentes-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nível de Gravidade *</label>
                <select name="gravidade" value={formData.gravidade} onChange={handleChange} className={`gravidade-${formData.gravidade}`} required>
                  <option value="">Selecione a gravidade</option>
                  {niveisGravidade.map(item => (
                    <option key={item.valor} value={item.valor}>{item.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Plataforma Afetada *</label>
                <input type="text" name="plataforma" placeholder="Digite a plataforma" value={formData.plataforma} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Data do Incidente *</label>
                <input type="date" name="data" value={formData.data} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Hora do Incidente *</label>
                <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Descrição Detalhada *</label>
              <textarea name="descricao" placeholder="Descreva o incidente..." value={formData.descricao} onChange={handleChange} rows="4" required />
            </div>

            <div className="form-group">
              <label>Ações Imediatas Tomadas *</label>
              <textarea name="acoesImediatas" placeholder="Informe as ações realizadas..." value={formData.acoesImediatas} onChange={handleChange} rows="4" required />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={enviando}>
                {enviando ? 'Registrando...' : 'Registrar Incidente'}
              </button>
              <button type="button" className="btn-reset" onClick={() => { limparFormulario(); setMensagem({ tipo: '', texto: '' }) }}>
                Limpar
              </button>
            </div>
          </form>
        </section>

        <section className="informacoes-section">
          <h2>Instruções de Preenchimento</h2>
          <div className="instrucoes-grid">
            <div className="instrucao-card">
              <h3>Gravidade</h3>
              <p>Escolha o nível de impacto do incidente.</p>
            </div>
            <div className="instrucao-card">
              <h3>Plataforma</h3>
              <p>Informe a plataforma afetada.</p>
            </div>
            <div className="instrucao-card">
              <h3>Descrição</h3>
              <p>Explique detalhadamente o ocorrido.</p>
            </div>
            <div className="instrucao-card">
              <h3>Ações Imediatas</h3>
              <p>Informe as medidas tomadas.</p>
            </div>
          </div>
        </section>
      </main>

      {/* --- NOVA SEÇÃO: LISTAGEM DE INCIDENTES ABAIXO --- */}
      <section className="lista-incidentes-section" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '1.6rem', color: '#0b2447', marginBottom: '20px' }}>Incidentes Reportados</h2>
        
        {loadingLista && <p>Carregando histórico de incidentes...</p>}
        
        {!loadingLista && incidentes.length === 0 && <p>Nenhum incidente registrado até o momento.</p>}

        <div className="incidentes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {incidentes.map((inc) => (
            <div key={inc.id} className="incidente-card-item" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderLeft: `6px solid ${inc.gravidade === 'critica' ? '#ef4444' : inc.gravidade === 'alta' ? '#f97316' : inc.gravidade === 'media' ? '#eab308' : '#3b82f6'}` }}>
              <div style={{ display: 'flex', justifyContent: 'between', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#0b2447' }}>{inc.plataforma}</span>
                <span className={`badge-gravidade`} style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', background: '#f1f5f9' }}>
                  {inc.gravidade.toUpperCase()}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 10px 0' }}>
                📅 {formatarData(inc.data)} às {inc.hora}
              </p>
              <div style={{ marginBottom: '10px' }}>
                <strong>Descrição:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#334155' }}>{inc.descricao}</p>
              </div>
              <div>
                <strong>Ações Imediatas:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#334155', fontStyle: 'italic' }}>{inc.acoesImediatas}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}