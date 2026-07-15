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

    // LISTAR TODOS
    public List<IncidentesResponseDTO> listarTodos() {
        List<IncidentesEntity> entidades = repository.findAll();

        return entidades.stream().map(this::converterParaDTO).collect(Collectors.toList());
    }

    // SALVAR (CREATE)
    public IncidentesResponseDTO salvar(IncidentesRequestDTO dto) {
        IncidentesEntity entity = new IncidentesEntity();
        copiarDtoParaEntidade(dto, entity);

        entity = repository.save(entity);
        return converterParaDTO(entity);
    }

    // ATUALIZAR (UPDATE)
    public IncidentesResponseDTO atualizar(Long id, IncidentesRequestDTO dto) {
        IncidentesEntity entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incidente não encontrado com o ID: " + id));

        copiarDtoParaEntidade(dto, entity);
        entity = repository.save(entity);

        return converterParaDTO(entity);
    }

    // DELETAR (DELETE)
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Incidente não encontrado com o ID: " + id);
        }
        repository.deleteById(id);
    }

    // Métodos auxiliares para evitar repetição de código (Clean Code)
    private void copiarDtoParaEntidade(IncidentesRequestDTO dto, IncidentesEntity entity) {
        entity.setGravidade(dto.getGravidade());
        entity.setData(dto.getData());
        entity.setHora(dto.getHora());
        entity.setPlataforma(dto.getPlataforma());
        entity.setDescricao(dto.getDescricao());
        entity.setAcoesImediatas(dto.getAcoesImediatas());
    }

    private IncidentesResponseDTO converterParaDTO(IncidentesEntity entity) {
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