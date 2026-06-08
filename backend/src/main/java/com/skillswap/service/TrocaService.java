package com.skillswap.service;

import com.skillswap.dto.TrocaDTO;
import com.skillswap.model.Habilidade;
import com.skillswap.model.Troca;
import com.skillswap.model.Usuario;
import com.skillswap.model.enums.StatusTroca;
import com.skillswap.repository.HabilidadeRepository;
import com.skillswap.repository.TrocaRepository;
import com.skillswap.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Indica que esta classe contém as regras de negócio da aplicação
public class TrocaService {

    @Autowired
    private TrocaRepository trocaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private HabilidadeRepository habilidadeRepository;

    // Cria uma solicitação de troca com status inicial pendente
    public Troca criar(TrocaDTO trocaDTO) {

        Usuario solicitante = usuarioRepository.findById(trocaDTO.getSolicitanteId())
                .orElseThrow(() -> new RuntimeException("Solicitante não encontrado"));

        Usuario destinatario = usuarioRepository.findById(trocaDTO.getDestinatarioId())
                .orElseThrow(() -> new RuntimeException("Destinatário não encontrado"));

        Habilidade habilidadeOferecida = habilidadeRepository.findById(trocaDTO.getHabilidadeOferecidaId())
                .orElseThrow(() -> new RuntimeException("Habilidade oferecida não encontrada"));

        Habilidade habilidadeDesejada = habilidadeRepository.findById(trocaDTO.getHabilidadeDesejadaId())
                .orElseThrow(() -> new RuntimeException("Habilidade desejada não encontrada"));

        Troca troca = new Troca();

        troca.setSolicitante(solicitante);
        troca.setDestinatario(destinatario);
        troca.setHabilidadeOferecida(habilidadeOferecida);
        troca.setHabilidadeDesejada(habilidadeDesejada);
        troca.setStatus(StatusTroca.PENDENTE);

        return trocaRepository.save(troca);
    }

    // Retorna todas as trocas cadastradas
    public List<Troca> listarTodas() {
        return trocaRepository.findAll();
    }

    // Retorna as trocas criadas por um usuário
    public List<Troca> listarPorSolicitante(Long solicitanteId) {
        return trocaRepository.findBySolicitanteId(solicitanteId);
    }

    // Retorna as trocas recebidas por um usuário
    public List<Troca> listarPorDestinatario(Long destinatarioId) {
        return trocaRepository.findByDestinatarioId(destinatarioId);
    }
}