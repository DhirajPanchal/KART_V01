package io.active.kart.inventory.config;

import io.active.kart.inventory.dto.ServiceDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InventoryConfig {

    @Bean
    public ServiceDTO getServiceDTO() {
        return new ServiceDTO();
    }

}
