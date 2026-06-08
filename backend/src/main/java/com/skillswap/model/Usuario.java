package com.skillswap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity // Indica que esta classe representa uma tabela no banco de dados
@Table(name = "usuarios") // Define o nome da tabela
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id // Chave primária da tabela
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Faz o banco gerar o ID automaticamente
    private Long id;

    private String nome;

    @Column(unique = true)
    private String email;

    private String senha;

    private String cidade;

    private String bio;

    // Lista de habilidades cadastradas pelo usuário
    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private List<Habilidade> habilidades;
}