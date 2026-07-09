import React, { useState } from "react";
import "./styles.css";

export default function Manutencoes() {
  // Estado centralizado espelhando a entidade Java Spring Boot
  const [manutencao, setManutencao] = useState({
    idEquipamento: "",
    criticidade: "",
    descricaoFalha: "",
  });

  // Manipulador dinâmico para inputs do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setManutencao((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submissão do formulário e preparação para integração
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica de consistência antes do envio
    if (!manutencao.idEquipamento || !manutencao.criticidade || !manutencao.descricaoFalha) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Dados capturados com sucesso para envio:", manutencao);

    /* 
      ==================================================================
      INTEGRAÇÃO FUTURA COM SPRING BOOT (POST)
      ==================================================================
      URL: http://localhost:8080/manutencoes
      Method: POST
      Headers: { "Content-Type": "application/json" }
      Body: JSON.stringify(manutencao)
      
      Exemplo de implementação com Fetch API:
      
      fetch("http://localhost:8080/manutencoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(manutencao)
      })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar manutenção.");
        return response.json();
      })
      .then(data => {
        alert("Solicitação de manutenção aberta com sucesso!");
        // Limpar o formulário após o sucesso
        setManutencao({ idEquipamento: "", criticidade: "", descricaoFalha: "" });
      })
      .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Falha ao conectar com o servidor.");
      });
    */
  };

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
      <main className="manutencao-card">
        <form onSubmit={handleSubmit} className="manutencao-form">
          <div className="manutencao-form-group">
            <label htmlFor="idEquipamento">ID do Equipamento *</label>
            <input
              type="text"
              id="idEquipamento"
              name="idEquipamento"
              className="manutencao-input"
              placeholder="Ex: TURB-001, GER-450, COMP-230"
              value={manutencao.idEquipamento}
              onChange={handleChange}
              maxLength={50}
              required
            />
          </div>

          <div className="manutencao-form-group">
            <label htmlFor="criticidade">Criticidade *</label>
            <select
              id="criticidade"
              name="criticidade"
              className="manutencao-input"
              value={manutencao.criticidade}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione a criticidade...</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          <div className="manutencao-form-group">
            <label htmlFor="descricaoFalha">Descrição da Falha *</label>
            <textarea
              id="descricaoFalha"
              name="descricaoFalha"
              className="manutencao-textarea"
              placeholder="Detalhe o problema encontrado no equipamento..."
              value={manutencao.descricaoFalha}
              onChange={handleChange}
              maxLength={500}
              required
            ></textarea>
            <span className="manutencao-char-counter">
              {manutencao.descricaoFalha.length} / 500 caracteres
            </span>
          </div>

          <button type="submit" className="manutencao-button">
            Enviar Solicitação
          </button>
        </form>
      </main>

      {/* Seção Informativa de Processos */}
      <section className="manutencao-processo-secao">
        <h2>Processo de Manutenção</h2>
        <div className="manutencao-grid-cards">
          <div className="manutencao-card-info">
            <h3>Identificação do Equipamento</h3>
            <p>O equipamento é identificado através do seu código operacional.</p>
          </div>
          
          <div className="manutencao-card-info">
            <h3>Avaliação da Criticidade</h3>
            <p>A equipe técnica avalia a gravidade da falha registrada.</p>
          </div>

          <div className="manutencao-card-info">
            <h3>Execução da Ordem de Serviço</h3>
            <p>A solicitação segue para análise e execução da manutenção.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
