import { ReactNode } from "react";
import "./docker.scroll.style.scss";
import DockerContainer from "./docker.container";
import { usePlayer } from "../../providers/player.context";

export default function DockerScroll(): ReactNode {
    const player = usePlayer();

    return (
        <docker-scroll>
            <DockerContainer meta={ player.previousSong } type="previouse" />
            <DockerContainer meta={ player.currentSong } type="current" />
            <DockerContainer meta={ player.nextSong } type="next" />
        </docker-scroll>
    );
}