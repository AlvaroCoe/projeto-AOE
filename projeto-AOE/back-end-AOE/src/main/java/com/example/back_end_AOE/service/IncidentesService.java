package com.example.back_end_AOE.service;

import com.example.back_end_AOE.dto.IncidentesRequestDTO;
import com.example.back_end_AOE.dto.IncidentesResponseDTO;
import com.example.back_end_AOE.entity.IncidentesEntity;
import com.example.back_end_AOE.repository.IncidentesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncidentesService {

    @Autowired
    private IncidentesRepository repository;

    // MÉTODO NOVO: Listar todos os incidentes
    public List<IncidentesResponseDTO> listarTodos() {
        List<IncidentesEntity> entidades = repository.findAll();

        return entidades.stream().map(entity -> {
            IncidentesResponseDTO response = new IncidentesResponseDTO();
            response.setId(entity.getId());
            response.setGravidade(entity.getGravidade());
            response.setData(entity.getData());
            response.setHora(entity.getHora());
            response.setPlataforma(entity.getPlataforma());
            response.setDescricao(entity.getDescricao());
            response.setAcoesImediatas(entity.getAcoesImediatas());
            return response;
        }).collect(Collectors.toList());
    }

    public IncidentesResponseDTO salvar(IncidentesRequestDTO dto) {
        IncidentesEntity entity = new IncidentesEntity();

        entity.setGravidade(dto.getGravidade());
        entity.setData(dto.getData());
        entity.setHora(dto.getHora());
        entity.setPlataforma(dto.getPlataforma());
        entity.setDescricao(dto.getDescricao());
        entity.setAcoesImediatas(dto.getAcoesImediatas());

        entity = repository.save(entity);

        IncidentesResponseDTO response = new IncidentesResponseDTO();

        response.setId(entity.getId());
        response.setGravidade(entity.getGravidade());
        response.setData(entity.getData());
        response.setHora(entity.getHora());
        response.setPlataforma(entity.getPlataforma());
        response.setDescricao(entity.getDescricao());
        response.setAcoesImediatas(entity.getAcoesImediatas());

        return response;
    }
}