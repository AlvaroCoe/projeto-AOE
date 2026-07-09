package com.example.back_end_AOE.controller;

import com.example.back_end_AOE.dto.ProducaoResponseDTO;
import com.example.back_end_AOE.service.ProducaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/producao")
@CrossOrigin(origins = "*")
public class ProducaoController {

    @Autowired
    private ProducaoService service;

    @GetMapping
    public List<ProducaoResponseDTO> listarTodos() {
        return service.listarTodos();
    }
}