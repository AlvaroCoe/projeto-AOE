package com.example.back_end_AOE.service;

import com.example.back_end_AOE.dto.ManutencoesRequestDTO;
import com.example.back_end_AOE.dto.ManutencoesResponseDTO;
import com.example.back_end_AOE.entity.ManutencoesEntity;
import com.example.back_end_AOE.repository.ManutencoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManutencoesService {

    @Autowired
    private ManutencoesRepository repository;

    // CREATE (Salvar)
    public ManutencoesResponseDTO salvar(ManutencoesRequestDTO dto) {
        ManutencoesEntity entity = new ManutencoesEntity();

        entity.setIdEquipamento(dto.getIdEquipamento());
        entity.setCriticidade(dto.getCriticidade());
        entity.setDescricaoFalha(dto.getDescricaoFalha());

        entity = repository.save(entity);
        return mapToResponseDTO(entity);
    }

    // READ (Buscar Todos)
    public List<ManutencoesResponseDTO> buscarTodos() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // READ (Buscar por ID)
    public ManutencoesResponseDTO buscarPorId(Long id) {
        ManutencoesEntity entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutenção não encontrada com o ID: " + id));
        return mapToResponseDTO(entity);
    }

    // UPDATE (Atualizar)
    public ManutencoesResponseDTO atualizar(Long id, ManutencoesRequestDTO dto) {
        ManutencoesEntity entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutenção não encontrada com o ID: " + id));

        // Atualiza os campos vindos do DTO
        entity.setIdEquipamento(dto.getIdEquipamento());
        entity.setCriticidade(dto.getCriticidade());
        entity.setDescricaoFalha(dto.getDescricaoFalha());

        entity = repository.save(entity);
        return mapToResponseDTO(entity);
    }

    // DELETE (Deletar)
    public void deletar(Long id) {
        ManutencoesEntity entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manutenção não encontrada com o ID: " + id));
        repository.delete(entity);
    }

    // Método auxiliar privado para evitar repetição de mapeamento (Entity -> DTO)
    private ManutencoesResponseDTO mapToResponseDTO(ManutencoesEntity entity) {
        ManutencoesResponseDTO response = new ManutencoesResponseDTO();
        response.setId(entity.getId());
        response.setIdEquipamento(entity.getIdEquipamento());
        response.setCriticidade(entity.getCriticidade());
        response.setDescricaoFalha(entity.getDescricaoFalha());
        return response;
    }
}