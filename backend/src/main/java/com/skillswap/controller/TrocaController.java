package com.skillswap.controller;

import com.skillswap.dto.TrocaRespostaDTO;
import com.skillswap.dto.TrocaDTO;
import com.skillswap.model.Troca;
import com.skillswap.service.TrocaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Indica que esta classe recebe requisições HTTP e retorna respostas
@RequestMapping("/trocas") // Define a rota base dos endpoints de trocas
public class TrocaController {

    @Autowired
    private TrocaService trocaService;

    // Cria uma nova solicitação de troca
    @PostMapping
    public Troca criar(@RequestBody TrocaDTO trocaDTO) {
        return trocaService.criar(trocaDTO);
    }

    // Retorna todas as trocas cadastradas em formato simplificado
    @GetMapping
    public List<TrocaRespostaDTO> listarTodas() {
        return trocaService.listarTodas();
    }

    // Retorna as trocas criadas por um usuário
    @GetMapping("/solicitante/{solicitanteId}")
    public List<Troca> listarPorSolicitante(@PathVariable Long solicitanteId) {
        return trocaService.listarPorSolicitante(solicitanteId);
    }

    // Retorna as trocas recebidas por um usuário
    @GetMapping("/destinatario/{destinatarioId}")
    public List<Troca> listarPorDestinatario(@PathVariable Long destinatarioId) {
        return trocaService.listarPorDestinatario(destinatarioId);
    }

    // Método que atualiza o status da troca para ACEITA
    @PutMapping("/{trocaId}/aceitar")
    public TrocaRespostaDTO aceitar(@PathVariable Long trocaId) {
        return trocaService.aceitar(trocaId);
    }
}