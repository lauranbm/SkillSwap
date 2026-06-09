package com.skillswap.service;

import com.skillswap.dto.TrocaRespostaDTO;
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
    public TrocaRespostaDTO criar(TrocaDTO trocaDTO) {

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

        Troca trocaSalva = trocaRepository.save(troca);

        return converterParaRespostaDTO(trocaSalva);
    }

    // Retorna todas as trocas cadastradas em formato de resposta
    public List<TrocaRespostaDTO> listarTodas() {
        return trocaRepository.findAll()
                .stream()
                .map(this::converterParaRespostaDTO)
                .toList();
    }

    // Retorna as trocas criadas por um usuário
    public List<Troca> listarPorSolicitante(Long solicitanteId) {
        return trocaRepository.findBySolicitanteId(solicitanteId);
    }

    // Retorna as trocas recebidas por um usuário
    public List<Troca> listarPorDestinatario(Long destinatarioId) {
        return trocaRepository.findByDestinatarioId(destinatarioId);
    }

    // Método que atualiza o status da troca para ACEITA
    public TrocaRespostaDTO aceitar(Long trocaId) {

        Troca troca = buscarTrocaPorId(trocaId);
        // Garante que só trocas PENDENTES podem ser aceitas
        if (troca.getStatus() != StatusTroca.PENDENTE) {
            throw new RuntimeException("Apenas trocas pendentes podem ser aceitas");
        }

        troca.setStatus(StatusTroca.ACEITA);

        Troca trocaAtualizada = trocaRepository.save(troca);

        return converterParaRespostaDTO(trocaAtualizada);
    }

    // Método que converte uma entidade Troca em um DTO de resposta (public para que
    // todos os endpoints usem o DTO - padroniza-los)
    public TrocaRespostaDTO converterParaRespostaDTO(Troca troca) {
        return new TrocaRespostaDTO(
                troca.getId(),
                troca.getSolicitante().getNome(),
                troca.getDestinatario().getNome(),
                troca.getHabilidadeOferecida().getTitulo(),
                troca.getHabilidadeDesejada().getTitulo(),
                troca.getStatus().name());
    }

    // Atualiza o status da troca para RECUSADA
    public TrocaRespostaDTO recusar(Long trocaId) {

        Troca troca = buscarTrocaPorId(trocaId);
        // Garante que apenas trocas pendentes possam ser recusadas
        if (troca.getStatus() != StatusTroca.PENDENTE) {
            throw new RuntimeException("Apenas trocas pendentes podem ser recusadas");
        }

        troca.setStatus(StatusTroca.RECUSADA);

        Troca trocaAtualizada = trocaRepository.save(troca);

        return converterParaRespostaDTO(trocaAtualizada);
    }

    // Atualiza o status da troca para CONCLUIDA
    public TrocaRespostaDTO concluir(Long trocaId) {

        Troca troca = buscarTrocaPorId(trocaId);
        // Garante que apenas trocas com status ACEITA sejam concluidas
        if (troca.getStatus() != StatusTroca.ACEITA) {
            throw new RuntimeException("Apenas trocas aceitas podem ser concluídas");
        }

        troca.setStatus(StatusTroca.CONCLUIDA);

        Troca trocaAtualizada = trocaRepository.save(troca);

        return converterParaRespostaDTO(trocaAtualizada);
    }

    // Busca uma troca pelo id informado (evita repetição)
    private Troca buscarTrocaPorId(Long trocaId) {
        return trocaRepository.findById(trocaId)
                .orElseThrow(() -> new RuntimeException("Troca não encontrada"));
    }
}