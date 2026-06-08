package com.skillswap.service;

import com.skillswap.dto.UsuarioDTO;
import com.skillswap.model.Usuario;
import com.skillswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Indica que esta classe contém as regras de negócio da aplicação
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Salva um usuário no banco de dados
    public Usuario salvar(UsuarioDTO usuarioDTO) {

        Usuario usuario = new Usuario();

        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setSenha(usuarioDTO.getSenha());
        usuario.setCidade(usuarioDTO.getCidade());
        usuario.setBio(usuarioDTO.getBio());

        return usuarioRepository.save(usuario);
    }

    // Retorna todos os usuários cadastrados
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
}