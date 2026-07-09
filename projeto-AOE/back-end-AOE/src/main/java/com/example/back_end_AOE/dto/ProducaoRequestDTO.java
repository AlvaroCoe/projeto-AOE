package com.example.back_end_AOE.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProducaoRequestDTO {

    @NotBlank
    @Size(max = 100)
    private String plataforma;

    @NotBlank
    @Size(max = 50)
    private String volumePetroleo;

    @NotBlank
    @Size(max = 50)
    private String volumeGasNatural;

    @NotBlank
    @Size(max = 10)
    private String metaAtingida;

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