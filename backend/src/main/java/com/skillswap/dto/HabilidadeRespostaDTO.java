package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe responsável por transportar os dados de uma habilidade
 * nas respostas da API, sem expor dados sensíveis do usuário.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HabilidadeRespostaDTO {

    private Long id;

    private String titulo;

    private String descricao;

    private String categoria;

    private String trocaDesejada;

    private Long usuarioId;

    private String usuarioNome;
}