package io.active.kart.crm.function;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Consumer;

@Configuration
public class OrmFunction {


    @Bean
    public Consumer<String> docGenerationStatus() {
        return orderId -> {
            System.out.println(" ***  C R M  - docGenerationStatus() : " + orderId);
        };
    }

}