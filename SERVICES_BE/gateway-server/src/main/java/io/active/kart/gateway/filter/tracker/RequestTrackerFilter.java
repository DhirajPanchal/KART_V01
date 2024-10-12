package io.active.kart.gateway.filter.tracker;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Order(2)
@Component
public class RequestTrackerFilter implements GlobalFilter {

    @Autowired
    TrackerUtil trackerUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        HttpHeaders requestHeaders = exchange.getRequest().getHeaders();
        System.out.println("__ FILTER ------------------------------------------------ RequestTrackerFilter");


        return chain.filter(exchange);
    }

    private boolean isTrackerIdPresent(HttpHeaders requestHeaders) {
        return trackerUtil.getTrackerId(requestHeaders) != null;
    }

    private String generateCorrelationId() {
        return java.util.UUID.randomUUID().toString();
    }

}
