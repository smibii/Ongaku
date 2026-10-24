import { RepeatMode } from "tauri-plugin-media-api";

export interface MediaTrack {
    title: string;
    artist: string;
    cover: string;
    duration: number;
    playing: boolean;
    shuffle: boolean;
    loop: RepeatMode;
}