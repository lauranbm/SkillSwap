package com.skillswap.controller;

import com.skillswap.dto.HabilidadeRespostaDTO;
import com.skillswap.dto.HabilidadeDTO;
import com.skillswap.model.Habilidade;
import com.skillswap.service.HabilidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Indica que esta classe recebe requisições HTTP e retorna respostas
@RequestMapping("/habilidades") // Define a rota base dos endpoints de habilidades
public class HabilidadeController {

    @Autowired
    private HabilidadeService habilidadeService;

    // Cadastra uma nova habilidade vinculada a um usuário
    @PostMapping
    public Habilidade salvar(@RequestBody HabilidadeDTO habilidadeDTO) {
        return habilidadeService.salvar(habilidadeDTO);
    }

    // Retorna todas as habilidades cadastradas
    @GetMapping
    public List<HabilidadeRespostaDTO> listarTodas() {
        return habilidadeService.listarTodas();
    }

    // Retorna as habilidades cadastradas por um usuário específico
    @GetMapping("/usuario/{usuarioId}")
    public List<Habilidade> listarPorUsuario(@PathVariable Long usuarioId) {
        return habilidadeService.listarPorUsuario(usuarioId);
    }
}