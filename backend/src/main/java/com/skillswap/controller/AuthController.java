package com.skillswap.controller;

import com.skillswap.dto.AutenticacaoDTO;
import com.skillswap.dto.TokenDTO;
import com.skillswap.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import com.skillswap.service.TokenService;

@RestController // Indica que esta classe recebe requisições HTTP e retorna respostas
@RequestMapping("/auth") // Define a rota base dos endpoints de autenticação
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    // Realiza o login do usuário
    @PostMapping("/login")
    public TokenDTO login(@RequestBody AutenticacaoDTO autenticacaoDTO) {

        UsernamePasswordAuthenticationToken usuarioSenha = new UsernamePasswordAuthenticationToken(
                autenticacaoDTO.getEmail(),
                autenticacaoDTO.getSenha());

        var auth = authenticationManager.authenticate(usuarioSenha);

        Usuario usuario = (Usuario) auth.getPrincipal();

        String token = tokenService.gerarToken(usuario);

        return new TokenDTO(token);
    }
}