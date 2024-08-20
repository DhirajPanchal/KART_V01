package io.active.kart.base.dto;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@ConfigurationProperties(prefix = "service")
@Data
public class ServiceDTO {

    private String name;

    private Map<String, String> tags;

}
