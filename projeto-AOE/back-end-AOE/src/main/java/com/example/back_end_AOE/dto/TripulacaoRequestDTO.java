package com.example.back_end_AOE.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class TripulacaoRequestDTO {

    @NotBlank
    @Size(max = 120)
    private String nomeFuncionario;

    @NotBlank
    @Size(max = 80)
    private String funcao;

    @NotBlank
    @Size(max = 60)
    private String plataforma;

    @NotNull
    private LocalDate dataInicio;

    @NotNull
    private LocalDate dataFim;

    @NotBlank
    @Size(max = 20)
    private String regime;

    public TripulacaoRequestDTO() {
    }

    public TripulacaoRequestDTO(String nomeFuncionario, String funcao, String plataforma, LocalDate dataInicio, LocalDate dataFim, String regime) {
        this.nomeFuncionario = nomeFuncionario;
        this.funcao = funcao;
        this.plataforma = plataforma;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.regime = regime;
    }

    public @NotBlank @Size(max = 120) String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(@NotBlank @Size(max = 120) String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public @NotBlank @Size(max = 80) String getFuncao() {
        return funcao;
    }

    public void setFuncao(@NotBlank @Size(max = 80) String funcao) {
        this.funcao = funcao;
    }

    public @NotBlank @Size(max = 60) String getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(@NotBlank @Size(max = 60) String plataforma) {
        this.plataforma = plataforma;
    }

    public @NotNull LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(@NotNull LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public @NotNull LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(@NotNull LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public @NotBlank @Size(max = 20) String getRegime() {
        return regime;
    }

    public void setRegime(@NotBlank @Size(max = 20) String regime) {
        this.regime = regime;
    }
}