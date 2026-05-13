import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export const deleteUTFiles = async (file: string) => {
    try {
        const key = file.split('/f/')[1];
        await utapi.deleteFiles(key);
    } catch (error) {
            console.log('UTAPI: Error eliminando el archivo: ' + error);
    }
}