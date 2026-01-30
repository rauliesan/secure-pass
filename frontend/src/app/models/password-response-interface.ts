export interface PasswordResponse {
  score: number;
  strength: string;
  crackTime: string;
  suggestions: string[];
}