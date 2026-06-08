package com.skillswap.repository;

import com.skillswap.model.Habilidade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Interface responsável pelas operações de acesso aos dados da entidade Habilidade
public interface HabilidadeRepository extends JpaRepository<Habilidade, Long> {

    // Busca habilidades pelo id do usuário
    List<Habilidade> findByUsuarioId(Long usuarioId);
}