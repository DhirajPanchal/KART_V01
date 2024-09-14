package io.active.kart.crm;

import io.active.kart.base.dto.OrderDTO;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import java.util.function.Function;

@SpringBootApplication
@ComponentScan(basePackages = "io.active.kart")
@EntityScan(basePackages = "io.active.kart")
public class CrmApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrmApplication.class, args);
    }
    @Bean
    public Function<String, OrderDTO> uppercase() {
        return s -> new OrderDTO("CCC101");
    }

}
