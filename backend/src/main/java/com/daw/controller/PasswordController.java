package com.daw.controller;

import com.daw.dto.PasswordRequest;
import com.daw.dto.PasswordResponse;
import com.daw.service.PasswordEvaluatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/password")
// Permitir peticiones desde Angular (localhost:4200)
@CrossOrigin(origins = "http://localhost:4200") 
public class PasswordController {

    private final PasswordEvaluatorService service;

    public PasswordController(PasswordEvaluatorService service) {
        this.service = service;
    }

    @PostMapping("/evaluate")
    public ResponseEntity<PasswordResponse> evaluatePassword(@RequestBody PasswordRequest request) {
        PasswordResponse response = service.evaluate(request.getPassword());
        return ResponseEntity.ok(response);
    }
}
