package io.active.kart.inventory.controller;

import io.active.kart.inventory.dto.ServiceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    private ServiceDTO serviceDTO;

    @GetMapping
    public ResponseEntity<ServiceDTO> getService() {
        return ResponseEntity.status(HttpStatus.OK).body(serviceDTO);
    }
}
