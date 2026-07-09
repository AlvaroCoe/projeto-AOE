package com.example.back_end_AOE.service;

import com.example.back_end_AOE.dto.TripulacaoRequestDTO;
import com.example.back_end_AOE.dto.TripulacaoResponseDTO;
import com.example.back_end_AOE.entity.TripulacaoEntity;
import com.example.back_end_AOE.repository.TripulacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripulacaoService {

    private final TripulacaoRepository repository;

    public TripulacaoService(TripulacaoRepository repository) {
        this.repository = repository;
    }

    public TripulacaoResponseDTO salvar(TripulacaoRequestDTO dto){

        TripulacaoEntity entity = new TripulacaoEntity();

        entity.setNomeFuncionario(dto.getNomeFuncionario());
        entity.setFuncao(dto.getFuncao());
        entity.setPlataforma(dto.getPlataforma());
        entity.setDataInicio(dto.getDataInicio());
        entity.setDataFim(dto.getDataFim());
        entity.setRegime(dto.getRegime());

        entity = repository.save(entity);

        return converter(entity);
    }

    public List<TripulacaoResponseDTO> listar(){

        return repository.findAll()
                .stream()
                .map(this::converter)
                .collect(Collectors.toList());
    }

    private TripulacaoResponseDTO converter(TripulacaoEntity entity){

        TripulacaoResponseDTO dto = new TripulacaoResponseDTO();

        dto.setId(entity.getId());
        dto.setNomeFuncionario(entity.getNomeFuncionario());
        dto.setFuncao(entity.getFuncao());
        dto.setPlataforma(entity.getPlataforma());
        dto.setDataInicio(entity.getDataInicio());
        dto.setDataFim(entity.getDataFim());
        dto.setRegime(entity.getRegime());

        return dto;
    }

}