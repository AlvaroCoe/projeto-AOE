package com.example.back_end_AOE.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class IncidentesRequestDTO {

    @NotBlank(message = "A gravidade é obrigatória.")
    @Size(max = 30)
    private String gravidade;

    @NotBlank(message = "A data é obrigatória.")
    @Size(max = 20)
    private String data;

    @NotBlank(message = "A hora é obrigatória.")
    @Size(max = 10)
    private String hora;

    @NotBlank(message = "A plataforma é obrigatória.")
    @Size(max = 100)
    private String plataforma;

    @NotBlank(message = "A descrição é obrigatória.")
    @Size(max = 500)
    private String descricao;

    @NotBlank(message = "As ações imediatas são obrigatórias.")
    @Size(max = 500)
    private String acoesImediatas;

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