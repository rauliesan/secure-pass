package com.daw.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.dto.UserRequest;
import com.daw.dto.UserResponse;
import com.daw.service.PasswordEvaluatorService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	private final PasswordEvaluatorService service;
	
	@GetMapping("/user/login")
	public ResponseEntity<UserResponse> login(@RequestParam String email, @RequestParam String password){
		return ResponseEntity.ok().body(service.login(email, password));
	}
	
	@PostMapping("/user/register")
	public ResponseEntity<UserResponse> register(@RequestBody UserRequest request) {
		return ResponseEntity.ok().body(service.register(request));
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
	    // PasswordEvaluatorService debería tener un método para buscar por ID
	    return ResponseEntity.ok(service.findById(id)); 
	}
	
}
