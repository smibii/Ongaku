import { ReactNode } from "react";
import { useOngaku } from "../../providers/ongaku.context.tsx";
import "./home.style.scss";
import { getAudioMetadata } from "../../audio/audio.meta.ts";
import { unloadAudioElement } from "../../audio/audio.ts";
import AudioRegistry from "../../audio/audio.registry.ts";

export default function Home(): ReactNode {
    const ongaku = useOngaku();

    return (
        <home>
            <button
                onClick={
                    () => {
                        ongaku.setShowDocker(!ongaku.showDocker);
                    }
                }
            >
                Click!
            </button>

            <button
                onClick={
                    () => {
                        ongaku.setLightMode(!ongaku.lightMode);
                    }
                }
            >
                Light Mode
            </button>

            <button
                onClick={
                    () => {
                        ongaku.setRainbowMode(!ongaku.rainbowMode);
                    }
                }
            >
                Rainbow
            </button>

            <input
                type="range"
                max={ 355 }
                onChange={
                    e => {
                        ongaku.setBackgroundHue(parseInt(e.target.value));
                    }
                } 
            />

            <input
                onInput={
                    e => {
                        getAudioMetadata(e.currentTarget.value)
                            .then(meta => {
                                AudioRegistry.stopAll();
                                unloadAudioElement(ongaku.player.currentSong?.audio?.audioElement!);
                                ongaku.player.setCurrentSong(null);
                                ongaku.player.setIsPlaying(false);
                                ongaku.player.setCurrentSong(meta);
                            })
                            .catch(e => {
                                console.log(e);
                            })
                    }
                }
            />
        </home>
    );
}