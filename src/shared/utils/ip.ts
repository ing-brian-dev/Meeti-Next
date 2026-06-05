import { headers } from "next/headers";

export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  return (
    headersList.get("cf-connecting-ip") || // Cloudflare
    headersList.get("x-vercel-forwarded-for") || // Vercel
    headersList.get("x-real-ip") || // Nginx / proxies
    headersList.get("x-forwarded-for")?.split(",")[0].trim() || // standard
    headersList.get("remote-addr") || // fallback local/dev
    "unknown"
  );
}