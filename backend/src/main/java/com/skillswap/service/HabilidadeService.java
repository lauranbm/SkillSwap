package com.skillswap.service;

import com.skillswap.dto.HabilidadeDTO;
import com.skillswap.model.Habilidade;
import com.skillswap.model.Usuario;
import com.skillswap.repository.HabilidadeRepository;
import com.skillswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.skillswap.dto.HabilidadeRespostaDTO;

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

    // Converte uma entidade Habilidade em um DTO de resposta
    public HabilidadeRespostaDTO converterParaRespostaDTO(Habilidade habilidade) {
        return new HabilidadeRespostaDTO(
                habilidade.getId(),
                habilidade.getTitulo(),
                habilidade.getDescricao(),
                habilidade.getCategoria(),
                habilidade.getTrocaDesejada(),
                habilidade.getUsuario().getId(),
                habilidade.getUsuario().getNome());
    }

    // Retorna todas as habilidades cadastradas sem expor dados sensíveis do usuário
    public List<HabilidadeRespostaDTO> listarTodas() {
        return habilidadeRepository.findAll()
                .stream()
                .map(this::converterParaRespostaDTO)
                .toList();
    }

    // Retorna as habilidades cadastradas por um usuário específico
    public List<Habilidade> listarPorUsuario(Long usuarioId) {
        return habilidadeRepository.findByUsuarioId(usuarioId);
    }
}