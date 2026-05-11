import { UploadDropzone } from "@/src/shared/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";


export default function UploadImage() {
    const [uploadedImage, setUploadedImage] = useState('');

    return (
        <>
            <UploadDropzone
                endpoint={'meetiUploader'}
                className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700"
                appearance={{
                    button: "font-black py-3 w-full block h-auto rounded-none after:bg-orange-500 after:h-2 after:top-0",
                    label: "text-sm text-gray-600 hover:text-gray-700",
                    allowedContent: 'text-sm',
                }}
                onClientUploadComplete={(res) => {
                    setUploadedImage(res[0].ufsUrl);
                }}
                content={{
                    button: 'Selecciona una imagen',
                    label: 'Elige un Archivo o arrástralo aquí.',
                    allowedContent: 'Máximo 1 Imagen de 1MB'
                }}
                config={{
                    cn: twMerge,
                    mode: 'auto'
                }}
            />
            {uploadedImage && (
                <>
                    <p
                        className="text-lg font-bold"
                    >
                        Imagen Nueva:
                    </p>
                    <Image
                        src={uploadedImage}
                        alt="Imagen publicada"
                        width={300}
                        height={200}
                    />
                </>
            )}
        </>
    )
}
