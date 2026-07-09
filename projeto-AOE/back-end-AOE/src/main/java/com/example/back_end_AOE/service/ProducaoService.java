package com.example.back_end_AOE.service;

import com.example.back_end_AOE.dto.ProducaoResponseDTO;
import com.example.back_end_AOE.repository.ProducaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProducaoService {

    @Autowired
    private ProducaoRepository repository;

    public List<ProducaoResponseDTO> listarTodos() {

        return repository.findAll()
                .stream()
                .map(entity -> {

                    ProducaoResponseDTO dto = new ProducaoResponseDTO();

                    dto.setId(entity.getId());
                    dto.setPlataforma(entity.getPlataforma());
                    dto.setVolumePetroleo(entity.getVolumePetroleo());
                    dto.setVolumeGasNatural(entity.getVolumeGasNatural());
                    dto.setMetaAtingida(entity.getMetaAtingida());

                    return dto;
                })
                .collect(Collectors.toList());
    }
}