package io.active.kart.gateway.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class FallbackController {

    @RequestMapping("/support-tech-inventory")
    public Mono<String> inventoryTechSupport() {
        return Mono.just("Tech Support - INVENTORY : Please try after some time or contact support team!!!");
    }

    @RequestMapping("/support-customer-store")
    public Mono<String> storeCustomerSupport() {
        return Mono.just("Customer Support - STORE : Please try after some time or contact support team!!!");
    }


}