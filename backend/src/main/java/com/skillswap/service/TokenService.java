package com.skillswap.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.skillswap.model.Usuario;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * Serviço responsável por gerar tokens JWT para usuários autenticados.
 */
@Service
public class TokenService {

    // Chave usada para assinar o token
    private static final String SECRET = "skillswap-secret";

    // Gera um token JWT para o usuário autenticado
    public String gerarToken(Usuario usuario) {

        Algorithm algorithm = Algorithm.HMAC256(SECRET);

        return JWT.create()
                .withIssuer("skillswap")
                .withSubject(usuario.getEmail())
                .withExpiresAt(LocalDateTime.now()
                        .plusHours(2)
                        .toInstant(ZoneOffset.of("-03:00")))
                .sign(algorithm);
    }

    // Adiciona validação do token recebido e retorna o e-mail do usuário
    public String validarToken(String token) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);

            return JWT.require(algorithm)
                    .withIssuer("skillswap")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (Exception exception) {
            return "";
        }
    }
}