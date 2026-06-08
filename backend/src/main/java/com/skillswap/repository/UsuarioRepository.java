package com.skillswap.repository;

import com.skillswap.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Interface responsável pelas operações de acesso aos dados da entidade Usuario
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Busca um usuário pelo e-mail
    Optional<Usuario> findByEmail(String email);
}