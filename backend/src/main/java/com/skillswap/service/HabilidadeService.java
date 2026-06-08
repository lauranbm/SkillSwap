package com.skillswap.service;

import com.skillswap.dto.HabilidadeDTO;
import com.skillswap.model.Habilidade;
import com.skillswap.model.Usuario;
import com.skillswap.repository.HabilidadeRepository;
import com.skillswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Indica que esta classe contém as regras de negócio da aplicação
public class HabilidadeService {

    @Autowired
    private HabilidadeRepository habilidadeRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Salva uma habilidade vinculada a um usuário
    public Habilidade salvar(HabilidadeDTO habilidadeDTO) {

        Usuario usuario = usuarioRepository.findById(habilidadeDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Habilidade habilidade = new Habilidade();

        habilidade.setTitulo(habilidadeDTO.getTitulo());
        habilidade.setDescricao(habilidadeDTO.getDescricao());
        habilidade.setCategoria(habilidadeDTO.getCategoria());
        habilidade.setTrocaDesejada(habilidadeDTO.getTrocaDesejada());
        habilidade.setUsuario(usuario);

        return habilidadeRepository.save(habilidade);
    }

    // Retorna todas as habilidades cadastradas
    public List<Habilidade> listarTodas() {
        return habilidadeRepository.findAll();
    }

    // Retorna as habilidades cadastradas por um usuário específico
    public List<Habilidade> listarPorUsuario(Long usuarioId) {
        return habilidadeRepository.findByUsuarioId(usuarioId);
    }
}