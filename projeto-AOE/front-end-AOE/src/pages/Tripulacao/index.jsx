import './style.css'

import api from '../../services/api'
import { useState } from 'react'

import { toast } from 'react-toastify'

export default function Tripulacao() {

    const [tripulacao, setTripulacao] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const [nomeFuncionario, setNomeFuncionario] = useState('')
    const [funcao, setFuncao] = useState('')
    const [plataforma, setPlataforma] = useState('')
    const [regime, setRegime] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')

    const [cadastroStatus, setCadastroStatus] = useState(null)


    // controla edição
    const [editando, setEditando] = useState(false)
    const [idEditando, setIdEditando] = useState(null)



    async function fetchTripulacao() {

        try {

            setLoading(true)

            const res = await api.get('/api/tripulacao')

            setTripulacao(res.data)

        } catch (err) {

            setError(err.message)

        } finally {

            setLoading(false)

        }

    }



    async function handleCadastrar(e) {

        e.preventDefault()


        const dados = {

            nomeFuncionario,
            funcao,
            plataforma,
            regime,
            dataInicio,
            dataFim

        }



        try {


            if (editando) {


                await api.put(
                    `/api/tripulacao/${idEditando}`,
                    dados
                )


                toast.success(
                    "Tripulante atualizado com sucesso!"
                )


            } else {


                await api.post(
                    '/api/tripulacao',
                    dados
                )


                toast.success(
                    "Tripulante cadastrado!"
                )


            }



            limparFormulario()

            fetchTripulacao()



        } catch (err) {

            setCadastroStatus(
                "Erro: " + err.message
            )

        }

    }



    function iniciarEdicao(item) {


        setEditando(true)

        setIdEditando(item.id)


        setNomeFuncionario(item.nomeFuncionario)
        setFuncao(item.funcao)
        setPlataforma(item.plataforma)
        setRegime(item.regime)
        setDataInicio(item.dataInicio)
        setDataFim(item.dataFim)


        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }




    async function handleExcluir(id) {


        const confirmar = window.confirm(
            "Deseja realmente excluir?"
        )


        if (!confirmar)
            return



        try {


            await api.delete(
                `/api/tripulacao/${id}`
            )


            fetchTripulacao()



        } catch (err) {

            toast.error(
                "Erro ao excluir registro"
            )

        }


    }





    function limparFormulario() {


        setNomeFuncionario('')
        setFuncao('')
        setPlataforma('')
        setRegime('')
        setDataInicio('')
        setDataFim('')


        setEditando(false)

        setIdEditando(null)


    }




    function formatDate(dateStr) {

        if (!dateStr)
            return '-'


        const d = new Date(dateStr)

        return d.toLocaleDateString('pt-BR')

    }



    const agrupado = tripulacao.reduce((acc, item) => {


        const chave = item.plataforma || 'Sem plataforma'


        if (!acc[chave])
            acc[chave] = []


        acc[chave].push(item)


        return acc


    }, {})



    return (

        <div className="tripulacao-container">


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
                            ? "Editar Profissional"
                            : "Cadastrar Novo Profissional"
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
                        placeholder="Nome do Funcionário"
                        value={nomeFuncionario}
                        onChange={(e) => setNomeFuncionario(e.target.value)}
                        required
                    />


                    <input
                        placeholder="Função"
                        value={funcao}
                        onChange={(e) => setFuncao(e.target.value)}
                        required
                    />


                    <input
                        placeholder="Plataforma"
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                        required
                    />


                    <input
                        placeholder="Regime"
                        value={regime}
                        onChange={(e) => setRegime(e.target.value)}
                        required
                    />


                    <label>
                        Data início:
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                    </label>


                    <label>
                        Data fim:
                        <input
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                    </label>



                    <button type="submit">

                        {
                            editando
                                ? "Salvar Alteração"
                                : "Salvar Escala"
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
                    <p>{cadastroStatus}</p>
                }


            </section>



            <hr />


            <h1>
                Escala de Tripulação por Plataforma
            </h1>



            {loading &&
                <p>Carregando...</p>
            }



            {
                Object.keys(agrupado).map(plataforma => (


                    <section
                        className="plataforma-section"
                        key={plataforma}
                    >


                        <h2>
                            {plataforma}
                        </h2>



                        <ul>


                            {
                                agrupado[plataforma].map(p => (


                                    <li
                                        className="trip-card"
                                        key={p.id}
                                    >


                                        <div>
                                            {p.nomeFuncionario}
                                        </div>


                                        <div>
                                            {p.funcao}
                                        </div>


                                        <div>
                                            Regime: {p.regime}
                                        </div>


                                        <div>
                                            {formatDate(p.dataInicio)}
                                            {" — "}
                                            {formatDate(p.dataFim)}
                                        </div>



                                        <button
                                            className="btn-editar"
                                            onClick={() => iniciarEdicao(p)}
                                        >
                                            Editar
                                        </button>



                                        <button
                                            className="btn-excluir"
                                            onClick={() => handleExcluir(p.id)}
                                        >
                                            Excluir
                                        </button>



                                    </li>


                                ))
                            }


                        </ul>


                    </section>


                ))
            }



        </div>

    )

}