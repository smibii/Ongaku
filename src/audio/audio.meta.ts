import { readFile } from "@tauri-apps/plugin-fs";
import jsmediatags from "jsmediatags";
import AudioMetadata from "./audio.meta.type";
import defaultCover from "../assets/default-cover.png";

export async function getAudioMetadata(path: string): Promise<AudioMetadata> {
    try {
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
                        coverUrl: coverUrl || defaultCover,
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