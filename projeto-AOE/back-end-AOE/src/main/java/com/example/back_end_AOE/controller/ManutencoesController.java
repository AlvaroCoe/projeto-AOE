package com.example.back_end_AOE.controller;

import com.example.back_end_AOE.dto.ManutencoesRequestDTO;
import com.example.back_end_AOE.dto.ManutencoesResponseDTO;
import com.example.back_end_AOE.service.ManutencoesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manutencoes")
@CrossOrigin(origins = "*")
public class ManutencoesController {

    @Autowired
    private ManutencoesService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ManutencoesResponseDTO salvar(@RequestBody @Valid ManutencoesRequestDTO dto) {
        return service.salvar(dto);
    }
}