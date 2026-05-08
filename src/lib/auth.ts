import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '../db/index';
import { AuthEmailService } from '../emails/services/AuthEmailService';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        usePlural: true // Create tables with plural names
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async (data) => {
            const { name, email } = data.user;
             
        },
    },
    emailVerification: {
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async (data) => {
            const { name, email } = data.user;
            await AuthEmailService.sendVerificationEmail({
                name,
                email,
                url: data.url
            });
        }
    },
    plugins: [nextCookies()] // Those cookies must always be at the end for Next.js
});