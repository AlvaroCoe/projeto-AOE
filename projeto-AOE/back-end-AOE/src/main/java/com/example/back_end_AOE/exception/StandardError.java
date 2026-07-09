package com.example.back_end_AOE.exception;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

public record StandardError(
        Instant timestamp, // Exporta em padrão ISO 8601 nativo
        Integer status,
        String error,
        String message,
        String path
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}