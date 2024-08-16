package com.example.demo;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
//This annotation marks the class as a configuration class, which indicates that it contains
//bean definitions that the Spring container will manage

public class ProductConfig {
	 @Bean
	
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**")
	                        .allowedOrigins("http://localhost:3000")
	                        .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
	                        .allowedHeaders("*");
	            }
	        };
	    }
}
