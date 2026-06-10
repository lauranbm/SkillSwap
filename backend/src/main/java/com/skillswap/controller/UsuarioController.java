package com.skillswap.controller;

import com.skillswap.dto.UsuarioDTO;
import com.skillswap.model.Usuario;
import com.skillswap.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.skillswap.dto.UsuarioRespostaDTO;

import java.util.List;

@RestController // Indica que esta classe recebe requisições HTTP e retorna respostas
@RequestMapping("/usuarios") // Define a rota base dos endpoints de usuários
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Cadastra um novo usuário a partir dos dados recebidos na requisição
    @PostMapping
    public UsuarioRespostaDTO salvar(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioService.salvar(usuarioDTO);
        return usuarioService.converterParaRespostaDTO(usuario);
    }

    // Retorna todos os usuários cadastrados sem expor a senha
    @GetMapping
    public List<UsuarioRespostaDTO> listarTodos() {
        return usuarioService.listarTodos();
    }
}