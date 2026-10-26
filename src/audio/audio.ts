import AudioRegistry from "./audio.registry";
import { PreparedAudio } from "./audio.type";
import { readFile } from "@tauri-apps/plugin-fs";

export function createAudioFromPath(absolutePath: string): Promise<PreparedAudio> {
    AudioRegistry.stopAll();

    return new Promise(async (resolve, reject) => {
        try {
            const rawBytes = await readFile(absolutePath);

            const audioBlob = new Blob([rawBytes], { type: 'audio/mp3' });
            const blobUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio();
            audio.src = blobUrl;
            audio.preload = "auto";

            AudioRegistry.register(audio);

            let isResolved = false;

            const handleMetadataLoaded = () => {
                if (isResolved) return;
                
                if (!isNaN(audio.duration) && audio.duration > 0) {
                    isResolved = true;
                    resolve({
                        audioElement: audio,
                        srcUrl: blobUrl,
                        originalPath: absolutePath,
                        durationSec: audio.duration,
                        durationFormatted: formatDuration(audio.duration)
                    });
                }
            };

            audio.onloadedmetadata = handleMetadataLoaded;
            audio.oncanplaythrough = handleMetadataLoaded;

            audio.onerror = () => {
                reject(new Error(`HTML5 Audio buffer decoding failed. Code: ${audio.error?.code}`));
            };

            audio.load();
        } catch (error) {
            reject(new Error(`Failed to read file from storage array: ${error}`));
        }
    });
}

export function unloadAudioElement(audioElement: HTMLAudioElement | null) {
    if (!audioElement) return;

    try {
        audioElement.pause();
        const currentSrc = audioElement.src;

        audioElement.removeAttribute('src'); 
        audioElement.src = ''; 
        audioElement.load();

        if (currentSrc.startsWith('blob:')) {
            URL.revokeObjectURL(currentSrc);
            console.info("Memory cleared: Revoked resource allocation", currentSrc);
        }
    } catch (error) {
        console.error("Failed to cleanly release audio memory block:", error);
    }
}

function formatDuration(seconds: number): string {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}