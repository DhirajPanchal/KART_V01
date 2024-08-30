package io.active.kart.gateway.filter.tracker;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import java.util.List;

@Component
public class TrackerUtil {

    public static final String TRACKER_ID = "TRACKER_ID";

    public String getTrackerId(HttpHeaders requestHeaders) {
        if (requestHeaders.get(TRACKER_ID) != null) {
            List<String> requestHeaderList = requestHeaders.get(TRACKER_ID);
            return requestHeaderList.stream().findFirst().get();
        } else {
            return null;
        }
    }

    public ServerWebExchange setRequestHeader(ServerWebExchange exchange, String name, String value) {
        return exchange.mutate().request(exchange.getRequest().mutate().header(name, value).build()).build();
    }

    public ServerWebExchange setTrackerId(ServerWebExchange exchange, String correlationId) {
        return this.setRequestHeader(exchange, TRACKER_ID, correlationId);
    }

}
