package com.skillswap.model.enums;

/**
 * Enum responsável por representar os possíveis status de uma troca.
 */
public enum StatusTroca {

    // Troca criada, aguardando resposta do destinatário
    PENDENTE,

    // Troca aceita pelo destinatário
    ACEITA,

    // Troca recusada pelo destinatário
    RECUSADA,

    // Troca finalizada pelos usuários
    CONCLUIDA
}