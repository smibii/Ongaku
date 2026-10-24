import { ReactNode, useEffect } from "react";
import "./docker.style.scss";
import { useOngaku } from "../../providers/ongaku.context";
import DockerBody from "./docker.body";

export default function Docker(): ReactNode {
    const ongaku = useOngaku();

    const cover = "https://i.scdn.co/image/ab67616d00001e020b6b1eb7f04cd1c433dd596e";

    useEffect(() => {
        ongaku.player.setCurrentSong({
            artist: "Unknown",
            coverUrl: cover,
            path: "",
            title: "Some Title"
        });
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