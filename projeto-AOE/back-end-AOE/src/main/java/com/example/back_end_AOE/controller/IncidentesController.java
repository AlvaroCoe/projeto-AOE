package com.example.back_end_AOE.controller;

import com.example.back_end_AOE.dto.IncidentesRequestDTO;
import com.example.back_end_AOE.dto.IncidentesResponseDTO;
import com.example.back_end_AOE.service.IncidentesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidentes")
@CrossOrigin(origins = "*")
public class IncidentesController {

    @Autowired
    private IncidentesService service;

    // MÉTODO ADICIONADO: Retorna a lista completa convertida em DTO
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<IncidentesResponseDTO> listar() {
        return service.listarTodos();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public IncidentesResponseDTO salvar(@RequestBody @Valid IncidentesRequestDTO dto) {
        return service.salvar(dto);
    }
}