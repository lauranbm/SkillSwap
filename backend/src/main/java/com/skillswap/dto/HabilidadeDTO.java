package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe responsável por transportar os dados da habilidade
 * entre as camadas da aplicação e as requisições da API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HabilidadeDTO {

    // Título da habilidade oferecida
    private String titulo;

    // Descrição da habilidade oferecida
    private String descricao;

    // Categoria da habilidade
    private String categoria;

    // Serviço ou habilidade desejada em troca
    private String trocaDesejada;

    // Identificador do usuário responsável pela habilidade
    private Long usuarioId;
}