package com.skillswap.repository;

import com.skillswap.model.Troca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Interface responsável pelas operações de acesso aos dados da entidade Troca
public interface TrocaRepository extends JpaRepository<Troca, Long> {

    // Busca trocas criadas por um usuário
    List<Troca> findBySolicitanteId(Long solicitanteId);

    // Busca trocas recebidas por um usuário
    List<Troca> findByDestinatarioId(Long destinatarioId);
}