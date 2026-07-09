package com.example.back_end_AOE.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "incidentes")
public class IncidentesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    @NotBlank(message = "A gravidade é obrigatória.")
    @Size(max = 30, message = "A gravidade deve possuir no máximo 30 caracteres.")
    private String gravidade;

    @Column(nullable = false, length = 20)
    @NotBlank(message = "A data é obrigatória.")
    @Size(max = 20, message = "A data deve possuir no máximo 20 caracteres.")
    private String data;

    @Column(nullable = false, length = 10)
    @NotBlank(message = "A hora é obrigatória.")
    @Size(max = 10, message = "A hora deve possuir no máximo 10 caracteres.")
    private String hora;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "A plataforma é obrigatória.")
    @Size(max = 100, message = "A plataforma deve possuir no máximo 100 caracteres.")
    private String plataforma;

    @Column(nullable = false, length = 500)
    @NotBlank(message = "A descrição é obrigatória.")
    @Size(max = 500, message = "A descrição deve possuir no máximo 500 caracteres.")
    private String descricao;

    @Column(name = "acoes_imediatas", nullable = false, length = 500)
    @NotBlank(message = "As ações imediatas são obrigatórias.")
    @Size(max = 500, message = "As ações imediatas devem possuir no máximo 500 caracteres.")
    private String acoesImediatas;

    public IncidentesEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getGravidade() {
        return gravidade;
    }

    public void setGravidade(String gravidade) {
        this.gravidade = gravidade;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(String plataforma) {
        this.plataforma = plataforma;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAcoesImediatas() {
        return acoesImediatas;
    }

    public void setAcoesImediatas(String acoesImediatas) {
        this.acoesImediatas = acoesImediatas;
    }
}