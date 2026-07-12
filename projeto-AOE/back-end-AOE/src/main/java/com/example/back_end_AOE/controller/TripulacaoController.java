package com.example.back_end_AOE.controller;

import com.example.back_end_AOE.dto.TripulacaoRequestDTO;
import com.example.back_end_AOE.dto.TripulacaoResponseDTO;
import com.example.back_end_AOE.service.TripulacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tripulacao")
@CrossOrigin(origins = "*")
public class TripulacaoController {

    private final TripulacaoService service;

    public TripulacaoController(TripulacaoService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TripulacaoResponseDTO salvar(@RequestBody @Valid TripulacaoRequestDTO dto){
        return service.salvar(dto);
    }


    @GetMapping
    public List<TripulacaoResponseDTO> listar(){
        return service.listar();
    }


    // EDITAR
    @PutMapping("/{id}")
    public TripulacaoResponseDTO editar(
            @PathVariable Long id,
            @RequestBody @Valid TripulacaoRequestDTO dto){

        return service.editar(id, dto);
    }


    // DELETAR
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id){

        service.deletar(id);
    }

}