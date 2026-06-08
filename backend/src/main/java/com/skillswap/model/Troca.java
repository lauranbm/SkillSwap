package com.skillswap.model;

import com.skillswap.model.enums.StatusTroca;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidade responsável por representar uma solicitação de troca
 * entre dois usuários.
 */
@Entity
@Table(name = "trocas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Troca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Usuário que iniciou a solicitação
    @ManyToOne
    @JoinColumn(name = "solicitante_id")
    private Usuario solicitante;

    // Usuário que recebeu a solicitação
    @ManyToOne
    @JoinColumn(name = "destinatario_id")
    private Usuario destinatario;

    // Habilidade oferecida pelo solicitante
    @ManyToOne
    @JoinColumn(name = "habilidade_oferecida_id")
    private Habilidade habilidadeOferecida;

    // Habilidade desejada pelo solicitante
    @ManyToOne
    @JoinColumn(name = "habilidade_desejada_id")
    private Habilidade habilidadeDesejada;

    // Situação atual da troca
    @Enumerated(EnumType.STRING)
    private StatusTroca status;
}