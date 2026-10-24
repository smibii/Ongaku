import { PreparedAudio } from "./audio.type";

export default interface AudioMetadata {
    title: string;
    artist: string;
    coverUrl: string | null;
    path: string;
    audio?: PreparedAudio;
}