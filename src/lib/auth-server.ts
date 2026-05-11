import { headers } from "next/headers";
import { auth } from "./auth";

export async function getServerSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        return session;
    } catch (error) {
        return;
    }
}

export async function requireAuth() {
    const session = await getServerSession();

    return {
        session,
        isAuth: !!session
    };
}