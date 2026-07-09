package com.example.back_end_AOE.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "manutencoes")
public class ManutencoesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_equipamento", nullable = false, length = 50)
    @NotBlank(message = "O ID do equipamento é obrigatório.")
    @Size(max = 50, message = "O ID do equipamento deve possuir no máximo 50 caracteres.")
    private String idEquipamento;

    @Column(nullable = false, length = 30)
    @NotBlank(message = "A criticidade é obrigatória.")
    @Size(max = 30, message = "A criticidade deve possuir no máximo 30 caracteres.")
    private String criticidade;

    @Column(nullable = false, length = 500)
    @NotBlank(message = "A descrição da falha é obrigatória.")
    @Size(max = 500, message = "A descrição deve possuir no máximo 500 caracteres.")
    private String descricaoFalha;

    public ManutencoesEntity() {
    }

    public Long getId() {
        return id;
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