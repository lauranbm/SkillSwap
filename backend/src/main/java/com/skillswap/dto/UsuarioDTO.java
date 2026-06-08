package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Classe responsável por transportar os dados do usuário
 * entre as camadas da aplicação e as requisições da API.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

    // Nome do usuário
    private String nome;

    // E-mail do usuário
    private String email;

    // Senha do usuário
    private String senha;

    // Cidade do usuário
    private String cidade;

    // Descrição do perfil do usuário
    private String bio;
}