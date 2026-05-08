import { auth } from "@/src/lib/auth";
import { SingInInput, SingUpInput, ForgotPasswordInput } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRespository";
import { headers } from "next/headers";
import { APIError } from "better-auth";

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
                password,
                callbackURL: '/dashboard'
            },
            headers: await headers()
        });

        return {
            error: '',
            success: 'Cuenta creada correctamente!, revisa tu e-mail.'
        }
    }

    async login(credentials: SingInInput) {
        const { email, password } = credentials;

        const user = await this.authRepository.userExists(email);
        if (!user) {
            return {
                error: 'El usaurio no existe.',
                success: ''
            }
        }

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password
                    // callbackURL: '/dashboard' //This function only works on client components
                },
                headers: await headers()
            });

            return {
                error: '',
                success: 'Session iniciada correctamente!'
            }

        } catch (error) {
            if (error instanceof APIError) {

                const messages: Record<number, string> = {
                    401: 'Credenciales Incorrectas.',
                    403: 'Tu cuenta no ah sido confirmada, hemos enviado un email.'
                }
                const errorMessage = messages[error.statusCode];
                if (errorMessage) {
                    return {
                        error: errorMessage,
                        success: ''
                    }
                }
            }

        }

        return {
            error: '',
            success: ''
        }
    }

    async requestPasswordReset(input: ForgotPasswordInput) {
        const user = await this.authRepository.userExists(input.email);

        if (!user) return {
            error: 'El usuario no existe',
            success: ''
        }

        const { email } = input;
        await auth.api.requestPasswordReset({
            body: {
                email
            }
        })

        return {
            error: '',
            success: ''
        }
    }
}



export const authService = new AuthService(authRepository);