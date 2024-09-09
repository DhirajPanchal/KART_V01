package io.active.kart.gateway.filter.tracker;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import reactor.core.publisher.Mono;

@Slf4j
@Configuration
public class ResponseTrackerFilter {

    @Autowired
    TrackerUtil trackerUtil;

    @Bean
    public GlobalFilter postGlobalFilter() {
        return (exchange, chain) -> chain.filter(exchange).then(Mono.fromRunnable(
                () -> {
                    HttpHeaders requestHeaders = exchange.getRequest().getHeaders();
                    String trackerId = trackerUtil.getTrackerId(requestHeaders);
                    log.debug("Updated the TRACKER_ID in outbound headers: {}", trackerId);
                    exchange.getResponse().getHeaders().add(TrackerUtil.TRACKER_ID, trackerId);
                }));
    }

}