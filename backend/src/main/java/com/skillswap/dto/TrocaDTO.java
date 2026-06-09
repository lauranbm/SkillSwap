package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe responsável por por criar uma solicitação de troca.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrocaDTO {

    // Identificador do usuário que inicia a solicitação
    private Long solicitanteId;

    // Identificador do usuário que recebe a solicitação
    private Long destinatarioId;

    // Identificador da habilidade oferecida pelo solicitante
    private Long habilidadeOferecidaId;

    // Identificador da habilidade desejada pelo solicitante
    private Long habilidadeDesejadaId;
}