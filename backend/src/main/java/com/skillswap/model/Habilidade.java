package com.skillswap.model;

import jakarta.persistence.*;
import lombok.*;

@Entity // Indica que esta classe será uma tabela no banco
@Table(name = "habilidades") // Nome da tabela no MySQL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Habilidade {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID gerado automaticamente
    private Long id;

    // Nome da habilidade, exemplo: Inglês, Fotografia, Programação
    private String titulo;

    // Descrição da habilidade oferecida
    private String descricao;

    // Categoria, exemplo: Idiomas, Design, Música, Tecnologia
    private String categoria;

    // O que o usuário gostaria de receber em troca
    private String trocaDesejada;

    // Relacionamento: várias habilidades podem pertencer a um usuário
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}