import { SingUpInput } from "../schemas/authSchema";

class AuthService {

    async register(credentials: SingUpInput) {
        const { name, email, password } = credentials;

        
    }
}

export const authService = new AuthService();