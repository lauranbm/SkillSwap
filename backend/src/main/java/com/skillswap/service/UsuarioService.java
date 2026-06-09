package com.skillswap.service;

import com.skillswap.dto.UsuarioDTO;
import com.skillswap.model.Usuario;
import com.skillswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.skillswap.dto.UsuarioRespostaDTO;

import java.util.List;

@Service // Indica que esta classe contém as regras de negócio da aplicação
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Salva um usuário no banco de dados
    public Usuario salvar(UsuarioDTO usuarioDTO) {

        Usuario usuario = new Usuario();

        usuario.setNome(usuarioDTO.getNome());
        usuario.setTelefone(usuarioDTO.getTelefone());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setSenha(usuarioDTO.getSenha());
        usuario.setCidade(usuarioDTO.getCidade());
        usuario.setBio(usuarioDTO.getBio());

        return usuarioRepository.save(usuario);
    }

    // Retorna todos os usuários sem expor a senha
    public List<UsuarioRespostaDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::converterParaRespostaDTO)
                .toList();
    }

    // Converte uma entidade Usuario em um DTO de resposta (para evitar expor senha)
    public UsuarioRespostaDTO converterParaRespostaDTO(Usuario usuario) {
        return new UsuarioRespostaDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCidade(),
                usuario.getBio(),
                usuario.getTelefone());
    }
}