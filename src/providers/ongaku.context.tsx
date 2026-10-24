import {createContext, ReactNode, useContext, useState} from "react";
import IOngakuContext from "./ongaku.context.type.ts";
import AudioMetadata from "../audiometa/mp3meta.type.ts";

export const OngakuContext = createContext<IOngakuContext | null>(null);

export function useOngaku(): IOngakuContext {
    const context: IOngakuContext | null = useContext(OngakuContext);
    if (!context) throw new Error("Context is not set!");
    return context;
}

export function OngakuProvider(
    { children }: { children: ReactNode }
): ReactNode {
    const [lightMode, setLightMode] = useState<boolean>(false);
    const [showDocker, setShowDocker] = useState<boolean>(true);
    const [backgroundHue, setBackgroundHue] = useState<number>(200);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    
    const [currentSong, setCurrentSong] = useState<AudioMetadata | null>(null);
    const [nextSong, setNextSong] = useState<AudioMetadata | null>(null);
    const [previousSong, setPreviousSong] = useState<AudioMetadata | null>(null);

    return (
        <OngakuContext.Provider
            value={{
                lightMode,
                setLightMode,
                showDocker,
                setShowDocker,
                backgroundHue,
                setBackgroundHue,

                player: {
                    isPlaying,
                    setIsPlaying,

                    currentSong,
                    setCurrentSong,
                    nextSong,
                    setNextSong,
                    previousSong,
                    setPreviousSong
                }
            }}
        >
            { children }
        </OngakuContext.Provider>
    );
}