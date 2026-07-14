import './styles.css'

import api from '../../services/api'
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

export default function Manutencoes() {

    const [manutencoes, setManutencoes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [idEquipamento, setIdEquipamento] = useState('')
    const [criticidade, setCriticidade] = useState('')
    const [descricaoFalha, setDescricaoFalha] = useState('')

    const [cadastroStatus, setCadastroStatus] = useState(null)

    // controla edição
    const [editando, setEditando] = useState(false)
    const [idEditando, setIdEditando] = useState(null)

    // Carrega a lista ao abrir a tela
    useEffect(() => {
        fetchManutencoes()
    }, [])

    async function fetchManutencoes() {
        try {
            setLoading(true)
            const res = await api.get('/api/manutencoes')
            setManutencoes(res.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleCadastrar(e) {
        e.preventDefault()

        const dados = {
            idEquipamento,
            criticidade,
            descricaoFalha
        }

        try {
            if (editando) {
                await api.put(
                    `/api/manutencoes/${idEditando}`,
                    dados
                )
                toast.success(
                    "Solicitação de manutenção atualizada!"
                )
            } else {
                await api.post(
                    '/api/manutencoes',
                    dados
                )
                toast.success(
                    "Solicitação de manutenção aberta!"
                )
            }

            limparFormulario()
            fetchManutencoes()

        } catch (err) {
            setCadastroStatus(
                "Erro: " + err.message
            )
        }
    }

    function iniciarEdicao(item) {
        setEditando(true)
        setIdEditando(item.id)

        setIdEquipamento(item.idEquipamento)
        setCriticidade(item.criticidade)
        setDescricaoFalha(item.descricaoFalha)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    async function handleExcluir(id) {
        const confirmar = window.confirm(
            "Deseja realmente excluir esta solicitação?"
        )

        if (!confirmar)
            return

        try {
            await api.delete(
                `/api/manutencoes/${id}`
            )
            toast.success(
                "Solicitação excluída com sucesso!"
            )
            fetchManutencoes()

        } catch (err) {
            toast.error(
                "Erro ao excluir registro"
            )
        }
    }

    function limparFormulario() {
        setIdEquipamento('')
        setCriticidade('')
        setDescricaoFalha('')

        setEditando(false)
        setIdEditando(null)
    }

    return (
        <div className="manutencao-container">

            {/* Seção de Introdução */}
            <section className="manutencao-intro">
                <h1>Solicitação de Manutenção de Ativos</h1>
                <p>
                    Formulário para abertura de ordens de serviço em equipamentos industriais,
                    permitindo registrar falhas, identificar criticidade e iniciar processos de manutenção.
                </p>
            </section>

            {/* Card Principal - Formulário */}
            <section className="cadastro-section"
                style={{
                    marginBottom: '40px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                }}>

                <h2>
                    {
                        editando
                            ? "Editar Solicitação de Manutenção"
                            : "Abrir Solicitação de Manutenção"
                    }
                </h2>

                <form
                    onSubmit={handleCadastrar}
                    style={{
                        display: 'grid',
                        gap: '10px',
                        maxWidth: '400px'
                    }}>

                    <input
                        placeholder="ID do Equipamento" 
                        value={idEquipamento}
                        onChange={(e) => setIdEquipamento(e.target.value)}
                        maxLength={50}
                        required
                    />

                    <select
                        value={criticidade}
                        onChange={(e) => setCriticidade(e.target.value)}
                        required
                    >
                        <option value="" disabled>Nível Crítico...</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Média">Média</option>
                        <option value="Alta">Alta</option>
                        <option value="Crítica">Crítica</option>
                    </select>

                    <textarea
                        placeholder="Detalhe o problema encontrado no equipamento..."
                        value={descricaoFalha}
                        onChange={(e) => setDescricaoFalha(e.target.value)}
                        maxLength={500}
                        required
                        style={{ minHeight: '100px', fontFamily: 'inherit' }}
                    ></textarea>

                    <button type="submit">
                        {
                            editando
                                ? "Salvar Alterações"
                                : "Enviar Solicitação"
                        }
                    </button>

                    {
                        editando &&
                        <button
                            type="button"
                            onClick={limparFormulario}
                        >
                            Cancelar edição
                        </button>
                    }

                </form>

                {
                    cadastroStatus &&
                    <p className="cadastro-status-msg">{cadastroStatus}</p>
                }

            </section>

            <hr className="form-divider" />

            <h1>
                Ativos em Manutenção
            </h1>

            {loading &&
                <p>Carregando registros...</p>
            }

            {!loading && manutencoes.length === 0 && (
                <p>Nenhuma solicitação aberta no momento.</p>
            )}

            <ul className="trip-list" style={{ listStyle: 'none', padding: 0 }}>
                {
                    manutencoes.map(m => (
                        <li
                            className="trip-card"
                            key={m.id}
                        >
                            <div className="trip-nome">
                                Equipamento: {m.idEquipamento}
                            </div>

                            <div className="trip-regime">
                                Criticidade: {m.criticidade}
                            </div>

                            <div className="trip-periodo" style={{ marginTop: '8px' }}>
                                <strong>Falha descrita:</strong> {m.descricaoFalha}
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                <button
                                    className="btn-editar"
                                    onClick={() => iniciarEdicao(m)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn-excluir"
                                    onClick={() => handleExcluir(m.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}