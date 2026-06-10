package com.skillswap.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe responsável por transportar o token gerado após o login.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenDTO {

    // Token JWT gerado pela aplicação
    private String token;
}