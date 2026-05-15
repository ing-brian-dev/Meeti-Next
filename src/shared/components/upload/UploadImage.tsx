import { CommunityInput } from "@/src/features/communities/schemas/communitySchema";
import { UploadDropzone } from "@/src/shared/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormError } from "../forms";


export default function UploadImage() {
    const { formState: { errors }, setValue, clearErrors, getValues, setError } = useFormContext<CommunityInput>();
    const [uploadedImage, setUploadedImage] = useState('');

    const currentImage = getValues('image') ? getValues('image') : null;

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
                    setValue('image', res[0].ufsUrl);
                    clearErrors('image');
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
                onUploadError={(error) => {
                    if (error.code === "BAD_REQUEST") {
                        setError('image', {
                            message: "El tamaño del archivo es mas de 1MB"
                        });
                    }
                }}
            />
            {errors.image && <FormError>{errors.image.message}</FormError>}
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
            {currentImage && !uploadedImage && (
                <>
                    <p
                        className="text-lg font-bold"
                    >
                        Imagen Actual:
                    </p>
                    <Image
                        src={currentImage}
                        alt="Imagen publicada"
                        width={300}
                        height={200}
                    />
                </>
            )}
        </>
    )
}
