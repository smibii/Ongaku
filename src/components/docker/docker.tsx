import { ReactNode, useEffect } from "react";
import "./docker.style.scss";
import { useOngaku } from "../../providers/ongaku.context";
import DockerBody from "./docker.body";
import { getAudioMetadata } from "../../audiometa/audiometa";

export default function Docker(): ReactNode {
    const ongaku = useOngaku();

    useEffect(() => {
        // ongaku.player.setCurrentSong({
        //     artist: "Unknown",
        //     coverUrl: cover,
        //     path: "",
        //     title: "Some Title"
        // });
        getAudioMetadata("C:/Users/itsno/Music/SV - えいぷ.mp3")
            .then(meta => {
                ongaku.player.setCurrentSong(meta);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    return (
        <docker
            className={
                ongaku.showDocker && ongaku.player.currentSong 
                    ? "active" : ""
            }
        >
            { ongaku.player.currentSong && (
                <>
                    <DockerBody meta={ ongaku.player.currentSong! } />

                    <halo>
                        <img src={ ongaku.player.currentSong?.coverUrl! } loading="lazy" />
                    </halo>
                </>
            )}
        </docker>
    );
}