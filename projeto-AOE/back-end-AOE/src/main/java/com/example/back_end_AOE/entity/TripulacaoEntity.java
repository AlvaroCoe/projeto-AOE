package com.example.back_end_AOE.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
@Table(name = "tripulacao")
public class TripulacaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do funcionário é obrigatório.")
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String nomeFuncionario;

    @NotBlank(message = "A função é obrigatória.")
    @Size(max = 80)
    @Column(nullable = false, length = 80)
    private String funcao;

    @NotBlank(message = "A plataforma é obrigatória.")
    @Size(max = 60)
    @Column(nullable = false, length = 60)
    private String plataforma;

    @NotNull(message = "A data de início é obrigatória.")
    @Column(nullable = false)
    private LocalDate dataInicio;

    @NotNull(message = "A data de fim é obrigatória.")
    @Column(nullable = false)
    private LocalDate dataFim;

    @NotBlank(message = "O regime é obrigatório.")
    @Size(max = 20)
    @Column(nullable = false, length = 20)
    private String regime;

    public TripulacaoEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public String getFuncao() {
        return funcao;
    }

    public void setFuncao(String funcao) {
        this.funcao = funcao;
    }

    public String getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(String plataforma) {
        this.plataforma = plataforma;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public String getRegime() {
        return regime;
    }

    public void setRegime(String regime) {
        this.regime = regime;
    }
}