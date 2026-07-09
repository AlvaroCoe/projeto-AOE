package com.example.back_end_AOE.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ManutencoesRequestDTO {

    @NotBlank(message = "O ID do equipamento é obrigatório.")
    @Size(max = 50)
    private String idEquipamento;

    @NotBlank(message = "A criticidade é obrigatória.")
    @Size(max = 30)
    private String criticidade;

    @NotBlank(message = "A descrição da falha é obrigatória.")
    @Size(max = 500)
    private String descricaoFalha;

    public String getIdEquipamento() {
        return idEquipamento;
    }

    public void setIdEquipamento(String idEquipamento) {
        this.idEquipamento = idEquipamento;
    }

    public String getCriticidade() {
        return criticidade;
    }

    public void setCriticidade(String criticidade) {
        this.criticidade = criticidade;
    }

    public String getDescricaoFalha() {
        return descricaoFalha;
    }

    public void setDescricaoFalha(String descricaoFalha) {
        this.descricaoFalha = descricaoFalha;
    }
}