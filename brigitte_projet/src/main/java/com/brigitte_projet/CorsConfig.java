package com.brigitte_projet;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // autorise tous les endpoints
                        .allowedOrigins("http://localhost:3001") // autorise ce frontend uniquement
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // autorise ces méthodes
                        .allowedHeaders("*") // autorise tous les headers
                        .allowCredentials(true); // autorise l'envoi de cookies / auth
            }
        };
    }
}
