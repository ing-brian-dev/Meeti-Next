import { auth } from "@/src/lib/auth";

export type User = typeof auth.$Infer.Session.user;
