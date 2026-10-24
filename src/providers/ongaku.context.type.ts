import AudioMetadata from "../audiometa/audiometa.type";

export default interface IOngakuContext {
    lightMode: boolean;
    setLightMode: (value: boolean) => void;
    rainbowMode: boolean;
    setRainbowMode: (value: boolean) => void;

    showDocker: boolean;
    setShowDocker: (value: boolean) => void;
    backgroundHue: number;
    setBackgroundHue: (value: number) => void;
    player: IOngakuPlayer;
}

interface IOngakuPlayer {
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;

    currentSong: AudioMetadata | null;
    setCurrentSong: (value: AudioMetadata | null) => void;
    nextSong: AudioMetadata | null;
    setNextSong: (value: AudioMetadata | null) => void;
    previousSong: AudioMetadata | null;
    setPreviousSong: (value: AudioMetadata | null) => void;
}