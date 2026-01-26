export interface PasswordResponse {
  score: number;        // 0 (Muy débil) a 4 (Muy fuerte)
  strength: string;     // Texto: "Very Weak", "Strong", etc.
  crackTime: string;    // Texto: "2 minutes", "centuries"
  suggestions: string[]; // Array de strings con consejos
}