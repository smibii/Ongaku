import jsmediatags from "jsmediatags";
import AudioMetadata from "./mp3meta.type";

export function getAudioMetadata(path: string): Promise<AudioMetadata> {
    return new Promise((resolve, reject) => {
        jsmediatags.read(path, {
            onSuccess: (tag) => {
                const { title, artist, picture } = tag.tags;
                let coverUrl: string | null = null;

                if (picture) {
                    const { data, format } = picture;
                    const byteArray = new Uint8Array(data);
                    const blob = new Blob([byteArray], { type: format });
                    coverUrl = URL.createObjectURL(blob);
                }

                resolve({
                    title: title!,
                    artist: artist || 'Unbekannter Künstler',
                    coverUrl: coverUrl,
                    path
                });
            },
            onError: (error) => {
                reject(error);
            }
        });
    });
}