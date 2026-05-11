import { requireAuth } from "@/src/lib/auth-server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    meetiUploader: f({
        image: {
            maxFileSize: "1MB",
            maxFileCount: 1,
        }
    })
        .middleware(async ({ req }) => {
            // Este código se ejecuta antes de subir el archivo
            const { session } = await requireAuth();

            // Prevenir que usuarios no autenticados no suban imágenes
            if (!session) throw new UploadThingError("Unauthorized");

            // Lo que se retorna aquí estará disponibe en onUploadComplete en `metadata`
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // Este código se ejecuta en el servidor una vez que se sube el archivo
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.ufsUrl);

            // Lo que se retorna aquí estará disponibe en `onClientUploadComplete` callback
            return {
                uploadedBy: metadata.userId
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;