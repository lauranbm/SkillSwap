package com.skillswap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

//imports da parte de segurança
import com.skillswap.model.enums.UsuarioFuncao;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

import java.util.List;

@Entity // Indica que esta classe representa uma tabela no banco de dados
@Table(name = "usuarios") // Define o nome da tabela
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id // Chave primária da tabela
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Faz o banco gerar o ID automaticamente
    private Long id;

    private String nome;

    private String telefone;

    @Column(unique = true)
    private String email;

    private String senha;

    private String cidade;

    private String bio;

    // Lista de habilidades cadastradas pelo usuário
    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private List<Habilidade> habilidades;

    // Função do usuário no sistema
    @Enumerated(EnumType.STRING)
    private UsuarioFuncao funcao;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.funcao == UsuarioFuncao.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USUARIO"));
        }

        return List.of(new SimpleGrantedAuthority("ROLE_USUARIO"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}