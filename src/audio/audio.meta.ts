import { readFile } from "@tauri-apps/plugin-fs";
import jsmediatags from "jsmediatags";
import AudioMetadata from "./audio.meta.type";

export async function getAudioMetadata(path: string): Promise<AudioMetadata> {
    try {
        path = "/storage/emulated/0/Music/" + path;
        const fileContents = await readFile(path);

        const blob = new Blob([fileContents], { type: 'audio/mp3' });

        return new Promise((resolve, reject) => {
            jsmediatags.read(blob, {
                onSuccess: (tag) => {
                    const { title, artist, picture } = tag.tags;
                    let coverUrl: string | null = null;

                    if (picture) {
                        const { data, format } = picture;
                        const byteArray = new Uint8Array(data);
                        const imgBlob = new Blob([byteArray], { type: format });
                        coverUrl = URL.createObjectURL(imgBlob);
                    }

                    resolve({
                        title: title || 'Unknown Title',
                        artist: artist || 'Unknown Artist',
                        coverUrl: coverUrl,
                        path
                    });
                },
                onError: (error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        throw new Error(`Tauri FS Error: ${error}`);
    }
}