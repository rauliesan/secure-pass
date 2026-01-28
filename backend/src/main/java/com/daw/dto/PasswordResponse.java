package com.daw.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PasswordResponse {
	
    private int score;          // 0-4
    private String strength;    // Texto
    private String crackTime;   // Texto del tiempo
    private List<String> suggestions;
    
}