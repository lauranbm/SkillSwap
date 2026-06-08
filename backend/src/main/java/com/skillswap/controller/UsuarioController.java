package com.skillswap.controller;

import com.skillswap.dto.UsuarioDTO;
import com.skillswap.model.Usuario;
import com.skillswap.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Indica que esta classe recebe requisições HTTP e retorna respostas
@RequestMapping("/usuarios") // Define a rota base dos endpoints de usuários
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Cadastra um novo usuário a partir dos dados recebidos na requisição
    @PostMapping
    public Usuario salvar(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.salvar(usuarioDTO);
    }

    // Retorna todos os usuários cadastrados
    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }
}