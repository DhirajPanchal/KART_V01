package io.active.kart.inventory.controller;

import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeoutException;

@RestController
@RequestMapping("/api/inventory/resilience")
public class ResilienceTestController {

    @GetMapping("/retry-simple")
    public ResponseEntity<String> retrySimple() throws TimeoutException {
        System.out.println("__ retrySimple () ");

        throw new TimeoutException();

//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body("RETRY_SIMPLE");
    }


    @Retry(name = "retryFB", fallbackMethod = "retryFBFallback")
    @GetMapping("/retry-fallback")
    public ResponseEntity<String> retryFB() {
        System.out.println("__ retryFB () ");
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("RETRY_FB");
    }

    public ResponseEntity<String> retryFBFallback(Throwable throwable) {
        System.out.println("__ retryFBFallback () ");
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("RETRY_FB_EXECUTION");
    }
}
