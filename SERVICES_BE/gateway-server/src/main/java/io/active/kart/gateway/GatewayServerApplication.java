package io.active.kart.gateway;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.circuitbreaker.resilience4j.ReactiveResilience4JCircuitBreakerFactory;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JConfigBuilder;
import org.springframework.cloud.client.circuitbreaker.Customizer;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;

import java.time.Duration;
import java.time.LocalDateTime;

@SpringBootApplication
public class GatewayServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServerApplication.class, args);
    }


    @Bean
    public RouteLocator activeKartRouteConfig(RouteLocatorBuilder routeLocatorBuilder) {
        System.out.println("********************************** IN");
        System.out.println(routeLocatorBuilder.routes().route(p -> {
            System.out.println("**********************************" + p.path());
            return null;
        }));
        return routeLocatorBuilder.routes()
                .route(p -> p.path("/active-kart/inventory/**")
                        .filters(f -> f
                                .rewritePath("/active-kart/inventory/(?<segment>.*)", "/${segment}")
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
                                .retry(retryConfig -> retryConfig.setRetries(3)
                                        .setMethods(HttpMethod.GET)
                                        .setBackoff(Duration.ofMillis(100), Duration.ofMillis(1000), 2, true)))
                        .uri("lb://INVENTORY-SERVICE"))
                .route(p -> p.path("/active-kart/store/**")
                        .filters(f -> f
                                .rewritePath("/active-kart/store/(?<segment>.*)", "/${segment}")
                                .addResponseHeader("X-Response-Time", LocalDateTime.now().toString())
                                .circuitBreaker(config -> config.setName("circuitBreakerStore").setFallbackUri("forward:/support-customer-store"))
                        )
                        .uri("lb://STORE-SERVICE")).build();

    }
    // Circuit Beaker for Inventory
    //.circuitBreaker(config -> config.setName("circuitBreakerInventory").setFallbackUri("forward:/support-tech-inventory"))

    @Bean
    public Customizer<ReactiveResilience4JCircuitBreakerFactory> defaultCustomizer() {
        return factory -> factory.configureDefault(id -> new Resilience4JConfigBuilder(id)
                .circuitBreakerConfig(CircuitBreakerConfig.ofDefaults())
                .timeLimiterConfig(TimeLimiterConfig.custom().timeoutDuration(Duration.ofSeconds(4)).build()).build());
    }

}
