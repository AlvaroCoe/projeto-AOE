package com.example.back_end_AOE.service;

import com.example.back_end_AOE.dto.ManutencoesRequestDTO;
import com.example.back_end_AOE.dto.ManutencoesResponseDTO;
import com.example.back_end_AOE.entity.ManutencoesEntity;
import com.example.back_end_AOE.repository.ManutencoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManutencoesService {

    @Autowired
    private ManutencoesRepository repository;

    public ManutencoesResponseDTO salvar(ManutencoesRequestDTO dto) {

        ManutencoesEntity entity = new ManutencoesEntity();

        entity.setIdEquipamento(dto.getIdEquipamento());
        entity.setCriticidade(dto.getCriticidade());
        entity.setDescricaoFalha(dto.getDescricaoFalha());

        entity = repository.save(entity);

        ManutencoesResponseDTO response = new ManutencoesResponseDTO();

        response.setId(entity.getId());
        response.setIdEquipamento(entity.getIdEquipamento());
        response.setCriticidade(entity.getCriticidade());
        response.setDescricaoFalha(entity.getDescricaoFalha());

        return response;
    }
}