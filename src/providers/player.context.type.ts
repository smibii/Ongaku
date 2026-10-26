import { RepeatMode } from "tauri-plugin-media-api";
import AudioMetadata from "../audio/audio.meta.type";
import { PreparedAudio } from "../audio/audio.type";

export default interface IPlayerContext {
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    isShuffle: boolean;
    setIsShuffle: (value: boolean) => void;
    loopMode: RepeatMode;
    setLoopMode: (value: RepeatMode) => void;

    audio: PreparedAudio | null;
    setAudio: (value: PreparedAudio | null) => void;
    songPosition: number;
    setSongPosition: (value: number) => void;

    favoriteList: string[];
    isFavorite: (path: string) => boolean;
    setFavorite: (path: string) => void;
    setUnfavorite: (path: string) => void;

    currentSong: AudioMetadata | null;
    setCurrentSong: (value: string) => void;
    nextSong: AudioMetadata | null;
    setNextSong: (value: string) => void;
    previousSong: AudioMetadata | null;
    setPreviousSong: (value: string) => void;

    playlist: string[];
    setPlaylist: (list: string[]) => void;
    previouslyPlayed: string[];
    setPreviouslyPlayed: (list: string[]) => void;

    loadSongByPath: (path: string) => void;
    next: () => void;
    previous: () => void;

    lastSongChange: number;
}