package com.example.back_end_AOE.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "producao")
public class ProducaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "A plataforma é obrigatória.")
    @Size(max = 100)
    private String plataforma;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "O volume de petróleo é obrigatório.")
    @Size(max = 50)
    private String volumePetroleo;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "O volume de gás natural é obrigatório.")
    @Size(max = 50)
    private String volumeGasNatural;

    @Column(nullable = false, length = 10)
    @NotBlank(message = "O status da meta é obrigatório.")
    @Size(max = 10)
    private String metaAtingida;

    public ProducaoEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(String plataforma) {
        this.plataforma = plataforma;
    }

    public String getVolumePetroleo() {
        return volumePetroleo;
    }

    public void setVolumePetroleo(String volumePetroleo) {
        this.volumePetroleo = volumePetroleo;
    }

    public String getVolumeGasNatural() {
        return volumeGasNatural;
    }

    public void setVolumeGasNatural(String volumeGasNatural) {
        this.volumeGasNatural = volumeGasNatural;
    }

    public String getMetaAtingida() {
        return metaAtingida;
    }

    public void setMetaAtingida(String metaAtingida) {
        this.metaAtingida = metaAtingida;
    }
}