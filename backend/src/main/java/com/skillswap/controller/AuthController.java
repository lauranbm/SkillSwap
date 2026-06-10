package com.skillswap.controller;

import com.skillswap.dto.AutenticacaoDTO;
import com.skillswap.dto.TokenDTO;
import com.skillswap.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController // Indica que esta classe recebe requisições HTTP e retorna respostas
@RequestMapping("/auth") // Define a rota base dos endpoints de autenticação
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    // Realiza o login do usuário
    @PostMapping("/login")
    public TokenDTO login(@RequestBody AutenticacaoDTO autenticacaoDTO) {

        UsernamePasswordAuthenticationToken usuarioSenha =
                new UsernamePasswordAuthenticationToken(
                        autenticacaoDTO.getEmail(),
                        autenticacaoDTO.getSenha()
                );

        var auth = authenticationManager.authenticate(usuarioSenha);

        Usuario usuario = (Usuario) auth.getPrincipal();

        return new TokenDTO("Login realizado com sucesso para: " + usuario.getEmail());
    }
}