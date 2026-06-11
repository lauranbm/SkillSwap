package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe responsável por transportar os dados de login.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AutenticacaoDTO {

    // E-mail informado no login
    private String email;

    // Senha informada no login
    private String senha;
}