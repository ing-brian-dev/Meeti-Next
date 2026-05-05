import { auth } from "@/src/lib/auth";
import { SingUpInput } from "../schemas/authSchema";

class AuthService {

    async register(credentials: SingUpInput) {
        const { name, email, password } = credentials;

        
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        });
    }
}

export const authService = new AuthService();