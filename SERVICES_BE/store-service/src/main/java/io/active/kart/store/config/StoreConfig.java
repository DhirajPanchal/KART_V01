package io.active.kart.store.config;

import io.active.kart.store.dto.ServiceDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StoreConfig {

    @Bean
    public ServiceDTO getServiceDTO() {
        return new ServiceDTO();
    }

}
