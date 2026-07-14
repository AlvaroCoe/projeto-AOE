package com.example.back_end_AOE.controller;

import com.example.back_end_AOE.dto.ManutencoesRequestDTO;
import com.example.back_end_AOE.dto.ManutencoesResponseDTO;
import com.example.back_end_AOE.service.ManutencoesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manutencoes")
@CrossOrigin(origins = "*")
public class ManutencoesController {

    @Autowired
    private ManutencoesService service;

    // POST: Salvar Manutenção (Mantém exatamente seu padrão com @Valid)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ManutencoesResponseDTO salvar(@RequestBody @Valid ManutencoesRequestDTO dto) {
        return service.salvar(dto);
    }

    // GET: Listar Todas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ManutencoesResponseDTO> buscarTodos() {
        return service.buscarTodos();
    }

    // GET: Buscar Única por ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ManutencoesResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // PUT: Atualizar Manutenção existente (Usa @Valid também para garantir dados limpos)
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ManutencoesResponseDTO atualizar(@PathVariable Long id, @RequestBody @Valid ManutencoesRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    // DELETE: Excluir Manutenção (Retorna 204 No Content quando deletado com sucesso)
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}