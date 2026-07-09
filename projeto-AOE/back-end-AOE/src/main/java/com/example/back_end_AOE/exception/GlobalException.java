package com.example.back_end_AOE.exception;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class GlobalException {

    // 1. Erro de Requisição (400 - Bad Request)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<StandardError> illegalArgument(IllegalArgumentException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError err = new StandardError(Instant.now(), status.value(), "Atributo Inválido",
                e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    // 2. Recurso não encontrado (404 - Not Found)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<StandardError> entityNotFound(EntityNotFoundException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = new StandardError(Instant.now(), status.value(), "Recurso não encontrado",
                e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    // 3. Erro de Banco de Dados / Duplicidade (409 - Conflict)
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<StandardError> dataIntegrity(org.springframework.dao.DataIntegrityViolationException e,
                                                       HttpServletRequest request) {
        HttpStatus status = HttpStatus.CONFLICT;

        String message = "Erro de integridade de dados. O registro pode já existir ou violar regras do sistema.";

        if (e.getMostSpecificCause().getMessage().contains("duplicate")) {
            message = "Conflito: Um registro com estes dados já está cadastrado no sistema.";
        }

        StandardError err = new StandardError(Instant.now(), status.value(), "Conflito de Dados",
                message, request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    // 4. Validação de Campos (@Valid) (422 - Unprocessable Entity)
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<StandardError> validationError(org.springframework.web.bind.MethodArgumentNotValidException e,
                                                         HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

        String message = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(f -> f.getField() + ": " + f.getDefaultMessage()) // Diz qual campo falhou
                .orElse("Erro de validação nos campos enviados");

        StandardError err = new StandardError(Instant.now(), status.value(), "Erro de validação", message,
                request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    // 5. Erro Global Inesperado (500 - Internal Server Error)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardError> globalError(Exception e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        StandardError err = new StandardError(Instant.now(), status.value(), "Erro de Processamento Interno",
                "Ocorreu um erro inesperado no servidor.", request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }
}