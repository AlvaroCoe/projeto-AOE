package com.example.back_end_AOE.dto;

public class ManutencoesResponseDTO {

    private Long id;
    private String idEquipamento;
    private String criticidade;
    private String descricaoFalha;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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