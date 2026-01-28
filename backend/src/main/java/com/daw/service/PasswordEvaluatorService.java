package com.daw.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.daw.dto.PasswordResponse;
import com.nulabinc.zxcvbn.Strength;
import com.nulabinc.zxcvbn.Zxcvbn;

@Service
public class PasswordEvaluatorService {

    // Instanciamos el motor de zxcvbn (es thread-safe)
    private final Zxcvbn zxcvbn = new Zxcvbn();

    public PasswordResponse evaluate(String password) {
        if (password == null || password.isEmpty()) {
            return PasswordResponse.builder()
                    .score(0)
                    .strength("Very Weak")
                    .crackTime("Instant")
                    .suggestions(List.of("Password cannot be empty"))
                    .build();
        }

        // 1. Calcular fuerza
        Strength strength = zxcvbn.measure(password);

        // 2. Obtener sugerencias (Warning + Suggestions)
        List<String> suggestions = new ArrayList<>();
        if (strength.getFeedback().getWarning() != null && !strength.getFeedback().getWarning().isEmpty()) {
            suggestions.add(strength.getFeedback().getWarning());
        }
        suggestions.addAll(strength.getFeedback().getSuggestions());

        // 3. Construir respuesta mapeando los datos
        return PasswordResponse.builder()
                .score(strength.getScore()) // Devuelve int 0-4
                .strength(mapScoreToText(strength.getScore()))
                // crackTimeDisplay devuelve cosas como "3 minutes", "centuries", etc.
                .crackTime(strength.getCrackTimesDisplay().getOfflineFastHashing1e10PerSecond()) 
                .suggestions(suggestions)
                .build();
    }

    private String mapScoreToText(int score) {
        return switch (score) {
            case 0 -> "Very Weak";
            case 1 -> "Weak";
            case 2 -> "Fair";
            case 3 -> "Strong";
            case 4 -> "Very Strong";
            default -> "Unknown";
        };
    }
}