import './style.css'

import api from '../../services/api'
import { useState } from 'react'

export default function Tripulacao() {
    const [tripulacao, setTripulacao] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Estados para armazenar os dados do formulário de cadastro
    const [nomeFuncionario, setNomeFuncionario] = useState('')
    const [funcao, setFuncao] = useState('')
    const [plataforma, setPlataforma] = useState('')
    const [regime, setRegime] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [cadastroStatus, setCadastroStatus] = useState(null)

    // Função para carregar a lista de tripulantes da API
    async function fetchTripulacao() {
        try {
            setLoading(true)
            setError(null)
            const res = await api.get('/api/tripulacao')
            setTripulacao(res.data)
        } catch (err) {
            setError(err.message || 'Erro ao carregar os dados.')
        } finally {
            setLoading(false)
        }
    }


    // Função executada ao clicar no botão de enviar o formulário
    async function handleCadastrar(e) {
        e.preventDefault() // Impede a página de recarregar
        setCadastroStatus('Salvando...')

        const novoMembro = {
            nomeFuncionario,
            funcao,
            plataforma,
            regime,
            dataInicio,
            dataFim
        }

        try {
            // Envia o POST para a rota /api/tripulacao do Spring Boot
            await api.post('/api/tripulacao', novoMembro)
            
            setCadastroStatus('Cadastrado com sucesso!')
            
            // Limpa os campos do formulário após o sucesso
            setNomeFuncionario('')
            setFuncao('')
            setPlataforma('')
            setRegime('')
            setDataInicio('')
            setDataFim('')

            // Atualiza a listagem automaticamente na tela
            fetchTripulacao()
        } catch (err) {
            setCadastroStatus('Erro ao cadastrar: ' + (err.response?.data?.message || err.message))
        }
    }

    function formatDate(dateStr) {
        if (!dateStr) return '-'
        const d = new Date(dateStr)
        if (Number.isNaN(d.getTime())) return dateStr
        return d.toLocaleDateString('pt-BR')
    }

    // Agrupa por plataforma
    const agrupado = tripulacao.reduce((acc, item) => {
        const chave = item.plataforma || 'Sem plataforma'
        if (!acc[chave]) acc[chave] = []
        acc[chave].push(item)
        return acc
    }, {})

    return (
        <div className="tripulacao-container">
            {/* FORMULÁRIO DE CADASTRO */}
            <section className="cadastro-section" style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>Cadastrar Novo Profissional</h2>
                <form onSubmit={handleCadastrar} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
                    <input type="text" placeholder="Nome do Funcionário" value={nomeFuncionario} onChange={(e) => setNomeFuncionario(e.target.value)} required />
                    <input type="text" placeholder="Função (Ex: Engenheiro de Petróleo)" value={funcao} onChange={(e) => setFuncao(e.target.value)} required />
                    <input type="text" placeholder="Plataforma (Ex: P-50)" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} required />
                    <input type="text" placeholder="Regime de Confinamento (Ex: 14x14)" value={regime} onChange={(e) => setRegime(e.target.value)} required />
                    <label>Data de Início: <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required /></label>
                    <label>Data de Fim: <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required /></label>
                    <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#002f6c', color: 'white', border: 'none', borderRadius: '4px' }}>Salvar Escala</button>
                </form>
                {cadastroStatus && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{cadastroStatus}</p>}
            </section>

            <hr />

            {/* LISTAGEM EXISTENTE */}
            <h1>Escala de Tripulação por Plataforma</h1>
            
            {loading && <div className="trip-loading">Carregando escala...</div>}
            {error && <div className="trip-error">Erro: {error}</div>}

            {!loading && !error && Object.keys(agrupado).length === 0 && <p>Nenhum registro encontrado.</p>}

            {!loading && !error && Object.keys(agrupado).map((plataforma) => (
                <section className="plataforma-section" key={plataforma}>
                    <h2 className="plataforma-title">{plataforma}</h2>
                    <ul className="trip-list">
                        {agrupado[plataforma].map((p) => (
                            <li className="trip-card" key={p.id}>
                                <div className="trip-nome">{p.nomeFuncionario}</div>
                                <div className="trip-funcao">{p.funcao}</div>
                                <div className="trip-regime">Regime: {p.regime}</div>
                                <div className="trip-periodo">{formatDate(p.dataInicio)} — {formatDate(p.dataFim)}</div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    )
}