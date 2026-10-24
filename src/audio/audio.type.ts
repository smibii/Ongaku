export interface PreparedAudio {
    audioElement: HTMLAudioElement;
    srcUrl: string;
    originalPath: string;
    durationSec: number;
    durationFormatted: string;
}