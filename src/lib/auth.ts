import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '../db/index';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        usePlural: true // Create tables with plural names
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [nextCookies()] // Always must have to be those cookies until below for nextjs 
});