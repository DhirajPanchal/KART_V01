package io.active.kart.store.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/info")
    public ResponseEntity<String> getInfo() {
        System.out.println("__ UserController . GET /info : ");
        return new ResponseEntity<>("HELLO", HttpStatus.OK);
    }

}
