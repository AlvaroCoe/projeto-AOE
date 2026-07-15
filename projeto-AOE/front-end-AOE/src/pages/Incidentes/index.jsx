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
  const [incidentes, setIncidentes] = useState([]) 
  const [loadingLista, setLoadingLista] = useState(true)

  const [editId, setEditId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

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
    setIsEditing(false)
    setEditId(null)
  }

  const prepararEdicao = (incidente) => {
    setFormData({
      gravidade: incidente.gravidade,
      data: incidente.data,
      hora: incidente.hora,
      plataforma: incidente.plataforma,
      descricao: incidente.descricao,
      acoesImediatas: incidente.acoesImediatas
    })
    setEditId(incidente.id)
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExcluir = async (id) => {
    if (window.confirm("Deseja realmente excluir este incidente permanentemente?")) {
      try {
        await api.delete(`/api/incidentes/${id}`)
        setMensagem({
          tipo: 'sucesso',
          texto: 'Incidente excluído com sucesso!'
        })
        fetchIncidentes()
      } catch (err) {
        console.error("Erro ao excluir incidente:", err)
        setMensagem({
          tipo: 'erro',
          texto: 'Não foi possível excluir o incidente.'
        })
      }
    }
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
      let response

      if (isEditing) {
        response = await api.put(`/api/incidentes/${editId}`, formData)
      } else {
        response = await api.post('/api/incidentes', formData)
      }

      if (response.status === 200 || response.status === 201) {
        setMensagem({
          tipo: 'sucesso',
          texto: isEditing ? 'Incidente atualizado com sucesso!' : 'Incidente registrado com sucesso!'
        })
        limparFormulario()
        fetchIncidentes()
      }

    } catch (error) {
      console.error(error)
      setMensagem({
        tipo: 'erro',
        texto: isEditing ? 'Erro ao atualizar incidente.' : 'Erro ao registrar incidente.'
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
      {/* Cabeçalho */}
      <header className="incidentes-intro">
        <h1>Registro de Incidentes Operacionais</h1>
        <p>Formulário Crítico para Reporte de Anomalias, Análise de Falhas ou Acidentes em Plataformas.</p>
      </header>

      {/* Formulário Centralizado */}
      <div className="incidentes-card">
        <h2>{isEditing ? 'Editar Registro' : 'Registrar Ocorrência'}</h2>

        <div className="alerta-critico">
          <strong>⚠️ Atenção:</strong> Este formulário é crítico para a segurança operacional. Todos os campos devem ser preenchidos.
        </div>

        {mensagem.texto && (
          <div className={`mensagem mensagem-${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}

        <form className="incidentes-form" onSubmit={handleSubmit}>
          <div className="incidentes-form-group">
            <label>Nível de Gravidade *</label>
            <select name="gravidade" value={formData.gravidade} onChange={handleChange} required>
              <option value="">Selecione a gravidade</option>
              {niveisGravidade.map(item => (
                <option key={item.valor} value={item.valor}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="incidentes-form-group">
            <label>Plataforma Afetada *</label>
            <input type="text" name="plataforma" placeholder="Digite a plataforma" className="incidentes-input" value={formData.plataforma} onChange={handleChange} required />
          </div>

          <div className="incidentes-form-group">
            <label>Data do Incidente *</label>
            <input type="date" name="data" className="incidentes-input" value={formData.data} onChange={handleChange} required />
          </div>

          <div className="incidentes-form-group">
            <label>Hora do Incidente *</label>
            <input type="time" name="hora" className="incidentes-input" value={formData.hora} onChange={handleChange} required />
          </div>

          <div className="incidentes-form-group">
            <label>Descrição Detalhada *</label>
            <textarea name="descricao" placeholder="Descreva o incidente..." className="incidentes-textarea" value={formData.descricao} onChange={handleChange} rows="4" required />
          </div>

          <div className="incidentes-form-group">
            <label>Ações Imediatas Tomadas *</label>
            <textarea name="acoesImediatas" placeholder="Informe as ações realizadas..." className="incidentes-textarea" value={formData.acoesImediatas} onChange={handleChange} rows="4" required />
          </div>

          <div className="form-actions-row">
            <button type="submit" className="incidentes-button" style={{ backgroundColor: isEditing ? '#10b981' : '#0066cc' }} disabled={enviando}>
              {enviando ? 'Processando...' : isEditing ? 'Salvar Alterações' : 'Registrar Incidente'}
            </button>
            <button type="button" className="incidentes-button-secondary" onClick={() => { limparFormulario(); setMensagem({ tipo: '', texto: '' }) }}>
              {isEditing ? 'Cancelar' : 'Limpar'}
            </button>
          </div>
        </form>
      </div>

      {/* Grid de Cards Informativos */}
      <section className="incidentes-processo-secao">
        <h2>Instruções de Preenchimento</h2>
        <div className="incidentes-grid-cards">
          <div className="incidentes-card-info">
            <h3>Gravidade</h3>
            <p>Escolha o nível de impacto ou criticidade real do incidente operacional.</p>
          </div>
          <div className="incidentes-card-info">
            <h3>Plataforma</h3>
            <p>Identifique qual setor, máquina ou plataforma foi diretamente afetado.</p>
          </div>
          <div className="incidentes-card-info">
            <h3>Descrição</h3>
            <p>Explique detalhadamente e de forma clara o ocorrido em campo.</p>
          </div>
          <div className="incidentes-card-info">
            <h3>Ações Imediatas</h3>
            <p>Informe as primeiras medidas de contingência tomadas pela equipe local.</p>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE REPORTES ALINHADOS (Padrão Ativos em Manutenção) --- */}
      <section className="lista-incidentes-section">
        <h2>Incidentes Reportados</h2>
        
        {loadingLista && <p>Carregando histórico de incidentes...</p>}
        
        {!loadingLista && incidentes.length === 0 && <p>Nenhum incidente registrado até o momento.</p>}

        <div className="incidentes-lista-vertical">
          {incidentes.map((inc) => (
            <div key={inc.id} className="incidente-card-item-manutencao">
              
              {/* Informações Primárias de Identificação */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text)' }}>
                  Plataforma: {inc.plataforma}
                </span>
                <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', background: 'rgba(255,255,255,0.1)', color: 'var(--text)' }}>
                  {inc.gravidade.toUpperCase()}
                </span>
              </div>

              {/* Data e Hora de Cadastro */}
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', opacity: 0.7, margin: '0' }}>
                📅 {formatarData(inc.data)} às {inc.hora}
              </p>

              {/* Descrições estruturadas */}
              <div style={{ margin: '4px 0' }}>
                <strong style={{ color: 'var(--text)' }}>Descrição:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', color: 'var(--text)', opacity: 0.9 }}>
                  {inc.descricao}
                </p>
              </div>

              <div style={{ margin: '4px 0' }}>
                <strong style={{ color: 'var(--text)' }}>Ações Imediatas:</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', color: 'var(--text)', opacity: 0.9, fontStyle: 'italic' }}>
                  {inc.acoesImediatas}
                </p>
              </div>

              {/* Botões do CRUD alinhados à esquerda (Mesmo visual de "Ativos em Manutenção") */}
              <div className="incidente-action-buttons">
                <button onClick={() => prepararEdicao(inc)} className="btn-acao-editar">
                  Editar
                </button>
                <button onClick={() => handleExcluir(inc.id)} className="btn-acao-excluir">
                  Excluir
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  )
}