package com.ecommerce.mobzy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configura o mapeamento para servir as imagens dos produtos
        registry.addResourceHandler("/images/produtos/**")
                .addResourceLocations("classpath:/static/images/produtos/");
        
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }
}