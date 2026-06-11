package com.skillswap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Desativa CSRF para permitir requisições do frontend
                .csrf(csrf -> csrf.disable())

                // Aplica a configuração de CORS definida abaixo
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Libera todas as requisições
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Permite requisições vindas do frontend local
        config.setAllowedOrigins(List.of(
            "http://localhost:5173",
            "http://localhost:5174"
        ));

        // Permite os métodos HTTP que o frontend vai usar
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));

        // Permite todos os headers
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Aplica essa configuração para todas as rotas
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}