package com.skillswap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Indica que esta classe possui configurações do Spring
public class SecurityConfig {

    @Bean // Registra a configuração de segurança na aplicação
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Desativa a proteção CSRF para permitir testes via Postman
                .csrf(csrf -> csrf.disable())

                // Libera todas as requisições da aplicação
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )

                .build();
    }
}