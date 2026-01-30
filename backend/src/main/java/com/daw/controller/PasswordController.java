package com.daw.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.dto.PasswordRequest;
import com.daw.dto.PasswordResponse;
import com.daw.service.PasswordEvaluatorService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/password")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") 
public class PasswordController {

    private final PasswordEvaluatorService service;

    @PostMapping("/evaluate")
    public ResponseEntity<PasswordResponse> evaluatePassword(@RequestBody PasswordRequest request) {
        PasswordResponse response = service.evaluate(request.getPassword(), request.getUserId());
        return ResponseEntity.ok(response);
    }
}
