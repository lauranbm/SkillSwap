package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe responsável por transportar os dados de uma troca
 * para as respostas da API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrocaRespostaDTO {

    private Long id;

    private String solicitanteNome;

    private String destinatarioNome;

    private String habilidadeOferecidaTitulo;

    private String habilidadeDesejadaTitulo;

    private String status;
}