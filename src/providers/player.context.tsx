import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import AudioMetadata from "../audio/audio.meta.type.ts";
import { PreparedAudio } from "../audio/audio.type.ts";
import { getAudioMetadata } from "../audio/audio.meta.ts";
import { createAudioFromPath, unloadAudioElement } from "../audio/audio.ts";
import AudioRegistry from "../audio/audio.registry.ts";
import IContextParam from "./context.type.ts";
import { RepeatMode } from "tauri-plugin-media-api";
import IPlayerContext from "./player.context.type.ts";
import { MusicBaseDir } from "./directory.context.constant.ts";
import { useDirectory } from "./directory.context.tsx";

export const PlayerContext = createContext<IPlayerContext | null>(null);

export function usePlayer(): IPlayerContext {
    const context: IPlayerContext | null = useContext(PlayerContext);
    if (!context) throw new Error("Context is not set!");
    return context;
}

export default function PlayerProvider(
    { children }: IContextParam
): ReactNode {
    const directory = useDirectory();

    /*
     * Export states
     */
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isShuffle, setIsShuffle] = useState<boolean>(false);
    const [loopMode, setLoopMode] = useState<RepeatMode>(RepeatMode.None);

    const [audio, setAudio] = useState<PreparedAudio | null>(null);
    const [songPosition, setSongPosition] = useState<number>(0);

    const [currentSong, setCurrentSong] = useState<AudioMetadata | null>(null);
    const [nextSong, setNextSong] = useState<AudioMetadata | null>(null);
    const [previousSong, setPreviousSong] = useState<AudioMetadata | null>(null);

    const [favoriteList, setFavoriteList] = useState<string[]>([]);
    const [playlistPath, setPlaylistPath] = useState<string | null>(null);
    const [playlist, setPlaylist] = useState<string[]>([]);
    const [previouslyPlayed, setPreviouslyPlayed] = useState<string[]>([]);

    const [lastSongChange, setLastSongChange] = useState<number>(Date.now());
    
    /*
     * Automated audio element generation
     */
    useEffect(() => {
        if (!currentSong) return;
        
        const song = currentSong;
        createAudioFromPath(song.path)
            .then(audio => {
                audio.audioElement.onended = onAudioEnded;
                audio.audioElement.loop = loopMode === RepeatMode.Track;
                setAudio(audio);
                setIsPlaying(true);
            });
        
        const scroll = document.getElementsByTagName("docker-scroll")[0];
        scroll.children[1].scrollIntoView({
            behavior: "instant"
        });
    }, [currentSong]);

    function onAudioEnded() {
        switch (loopMode) {
            case RepeatMode.None:
                if (playlist.length === 0) {
                    setIsPlaying(false);
                    setSongPosition(0);
                }
                else {
                    const scroll = document.getElementsByTagName("docker-scroll")[0];
                    scroll.children[2].scrollIntoView({ behavior: "smooth" });
                }
                break;
            case RepeatMode.List:
                // if (playlist.length === 0) ; // Get list of items in current folder
                const scroll = document.getElementsByTagName("docker-scroll")[0];
                scroll.children[2].scrollIntoView({ behavior: "smooth" });
                break;
            case RepeatMode.Track:
                break;
        }
    }

    useEffect(() => {
        if (!audio) return;
        audio.audioElement.loop = loopMode === RepeatMode.Track;
    }, [loopMode]);

    useEffect(() => {
        if (!audio) return;
        if (isShuffle) {
            shuffle(playlist);
            setPlaylist(playlist);
        } else {
            asyncSetPlaylist();
        }
    }, [isShuffle]);

    async function asyncSetPlaylist() {
        const dir = await directory.getDirectory(playlistPath!);
        if (!dir) return;
        const files = directory.getFilePaths(dir);
        setPlaylist(files);
    }

    /*
     * Play / Pause recognition
     */
    useEffect(() => {
        if (!audio) return;

        if (audio.audioElement.paused && isPlaying) {
            audio.audioElement.play();
        } else if (!audio.audioElement.paused && !isPlaying) {
            audio.audioElement.pause();
        }
    }, [isPlaying]);

    /*
     * Media Track update
     */
    useEffect(() => {
        if (!audio || !audio.audioElement) {
            setSongPosition(0);
            return;
        }

        const handleTimeUpdate = () => {
            setSongPosition(audio.audioElement.currentTime);
        };

        audio.audioElement.addEventListener("timeupdate", handleTimeUpdate);
        setSongPosition(audio.audioElement.currentTime);

        return () => {
            audio.audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [audio, audio?.audioElement]);

    /*
     * Set song function
     */
    function loadSongByPath(path: string): void {
        getAudioMetadata(path)
            .then(meta => {
                AudioRegistry.stopAll();
                unloadAudioElement(audio?.audioElement!);
                setCurrentSong(null);
                setIsPlaying(false);
                setCurrentSong(meta);
            })
            .catch(e => {
                console.error(e);
            })
    }

    function next(): void {
        if (playlist.length === 0) return;
        setLastSongChange(Date.now());

        const pl = playlist;
        const pp = previouslyPlayed;

        const song = pl.shift();
        setPlaylist(pl);
        if (!song) return;

        if (currentSong) {
            pp.unshift(currentSong.path);
            setPreviouslyPlayed(pp);
        }
        
        _setPreviousSong(currentSong ? currentSong.path : null);
        _setNextSong(pl.length !== 0 ? pl[0] : null);
        loadSongByPath(song);
    }

    function previous(): void {
        if (previouslyPlayed.length === 0) return;
        setLastSongChange(Date.now());

        const pl = playlist;
        const pp = previouslyPlayed;

        const song = pp.shift();
        setPreviouslyPlayed(pp);
        if (!song) return;
        
        if (currentSong) {
            pl.unshift(currentSong.path);
            setPlaylist(pl);
        }

        _setNextSong(currentSong ? currentSong.path : null);
        _setPreviousSong(pp.length !== 0 ? pp[0] : null);
        loadSongByPath(song);
    }

    function _setSongPosition(value: number): void {
        if (!audio) return;
        audio.audioElement.currentTime = value;
        setSongPosition(value);
    }

    function _setCurrentSong(path: string | null): void {
        if (!path) return;
        loadSongByPath(path);
    }

    function _setNextSong(path: string | null): void {
        if (path)
            getAudioMetadata(path)
                .then(meta => {
                    setNextSong(meta);
                })
                .catch(e => {
                    console.error(e);
                    setNextSong(null);
                })
        else setNextSong(null);
    }

    function _setPreviousSong(path: string | null): void {
        if (path)
            getAudioMetadata(path)
                .then(meta => {
                    setPreviousSong(meta);
                })
                .catch(e => {
                    console.error(e);
                    setPreviousSong(null);
                })
        else setPreviousSong(null);
    }

    function shuffle(list: string[]) {
        let currentIndex = list.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [list[currentIndex], list[randomIndex]] = [
            list[randomIndex], list[currentIndex]];
        }
    }

    function _setPlaylist(list: string[]): void {
        list = list.map(i => i.startsWith(MusicBaseDir) ? i : MusicBaseDir + i.trim());
        const current = list.shift();
        if (isShuffle) shuffle(list);
        setPreviouslyPlayed([]);
        setPlaylist(list);
        _setCurrentSong(current ? current : null);
        _setNextSong(list.length !== 0 ? list[0] : null);
        _setPreviousSong(null);
    }

    function isFavorite(path: string): boolean {
        return favoriteList.includes(path);
    }

    function setFavorite(path: string): void {
        if (isFavorite(path)) return;
        favoriteList.push(path);
        setFavoriteList(favoriteList);
    }

    function setUnfavorite(path: string): void {
        if (!isFavorite(path)) return;
        setFavoriteList(
            favoriteList.filter(i => i !== path));
    }

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                setIsPlaying,
                isShuffle,
                setIsShuffle,
                loopMode,
                setLoopMode,

                audio,
                setAudio,
                songPosition,
                setSongPosition: _setSongPosition,

                favoriteList,
                isFavorite,
                setFavorite,
                setUnfavorite,

                currentSong,
                setCurrentSong: _setCurrentSong,
                nextSong,
                setNextSong: _setNextSong,
                previousSong,
                setPreviousSong: _setPreviousSong,

                playlist,
                setPlaylist: _setPlaylist,
                previouslyPlayed,
                setPreviouslyPlayed,

                loadSongByPath,
                next,
                previous,

                lastSongChange
            }}
        >
            { children }
        </PlayerContext.Provider>
    );
}