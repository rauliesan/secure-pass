package com.daw.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.dto.PasswordResponse;
import com.daw.dto.UserRequest;
import com.daw.dto.UserResponse;
import com.daw.entity.User;
import com.daw.repository.UserRepository;
import com.nulabinc.zxcvbn.Strength;
import com.nulabinc.zxcvbn.Zxcvbn;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PasswordEvaluatorService {
	
	private final UserRepository userRepository;

    // Instanciamos el motor de zxcvbn (es thread-safe)
    private final Zxcvbn zxcvbn = new Zxcvbn();

    public PasswordResponse evaluate(String password, Long userId) {
    	
    	if (userId != null) {
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                // Incrementamos contador
                int currentCount = (user.getContadorUsos() == null) ? 0 : user.getContadorUsos();
                user.setContadorUsos(currentCount + 1);
                
                // Guardamos cambios en el usuario (SOLO se actualiza el contador)
                userRepository.save(user);
            }
        }
    	
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
    
    
    //User

	public UserResponse login(String email, String password) {
		User user = userRepository.findByEmailAndPassword(email, password);
		UserResponse response = new UserResponse();
		response.setEmail(email);
		response.setContadorUsos(user.getContadorUsos());
		response.setId(user.getId());
		return response;
	}

	public UserResponse register(UserRequest request) {
		User user = new User();
		user.setEmail(request.getEmail());
		user.setPassword(request.getPassword());
		user.setContadorUsos(0);
		User saved = userRepository.save(user);
		UserResponse response = new UserResponse();
		response.setEmail(request.getEmail());
		response.setId(saved.getId());
		response.setContadorUsos(0);
		return response;
	}

	// Para obtener el contador
	public UserResponse findById(Long id) {
		Optional<User> optionalUser = userRepository.findById(id);
		if(optionalUser.isEmpty()) {
			return null;
		}
		UserResponse response = new UserResponse();
		response.setId(id);
		response.setEmail(optionalUser.get().getEmail());
		response.setContadorUsos(optionalUser.get().getContadorUsos());
		return response;
	}
    
    
}