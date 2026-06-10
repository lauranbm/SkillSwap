package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe responsável por transportar os dados de um usuário
 * nas respostas da API, sem expor dados sensíveis (Ex: senha)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRespostaDTO {

    private Long id;

    private String nome;

    private String telefone;

    private String email;

    private String cidade;

    private String bio;
    
}