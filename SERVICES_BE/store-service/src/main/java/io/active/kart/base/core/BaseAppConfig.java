package io.active.kart.base.core;

import io.active.kart.base.dto.ServiceDTO;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BaseAppConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public ServiceDTO getServiceDTO() {
        return new ServiceDTO();
    }

}
