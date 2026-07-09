package com.example.back_end_AOE.dto;

public class ProducaoResponseDTO {

    private Long id;
    private String plataforma;
    private String volumePetroleo;
    private String volumeGasNatural;
    private String metaAtingida;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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