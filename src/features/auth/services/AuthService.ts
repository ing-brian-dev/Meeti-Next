import { auth } from "@/src/lib/auth";
import { SingUpInput } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRespository";

class AuthService {

    constructor(
        private authRepository: IAuthRepository
    ) { }

    async register(credentials: SingUpInput) {
        const { name, email, password } = credentials;

        const user = await this.authRepository.userExists(email);
        if (user) {
            return {
                error: 'Este e-mail ya esta registrado.',
                success: ''
            }
        }

        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        });

        return {
            error: '',
            success: 'Cuenta creada correctamente!, revisa tu e-mail.'
        }
    }
}

export const authService = new AuthService(authRepository);