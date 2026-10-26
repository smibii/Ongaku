import { ReactNode, useEffect, useState } from "react";
import IDockerParam from "./docker.type";
import { FaHeart, FaRegHeart, FaPlay, FaPause, FaLongArrowAltRight } from "react-icons/fa";
import ProgressBar from "../progressbar/progressbar";
import { usePlayer } from "../../providers/player.context";
import "./docker.body.style.scss";
import { FaArrowDownWideShort, FaArrowsRotate, FaShuffle } from "react-icons/fa6";
import { RepeatMode } from "tauri-plugin-media-api";
import { ImLoop } from "react-icons/im";

export default function DockerBody(
    { meta, type }: IDockerParam
): ReactNode {
    const player = usePlayer();
    const [isFavorite, setIsFavorite] = useState<boolean>(player.isFavorite(meta?.path!));

    const audio = player.audio;
    const durationSec = audio?.durationSec || 0;

    const progressPercent = player.audio && durationSec > 0 ?
        (player.songPosition / player.audio.durationSec) * 100 : 0;

    const isCurrent = type === "current";

    useEffect(() => {
        if (!meta) return;
        setIsFavorite(player.isFavorite(meta.path));
    }, [ meta, player.favoriteList ]);

    return (
        <docker-body>
            <content>
                <info>
                    <img src={ meta!.coverUrl || undefined } loading="lazy" alt="Cover" />
                    <text>
                        <song-title>
                            {
                                !isCurrent ? meta!.title : 
                                <marquee scrollamount="2">
                                    { meta!.title }
                                </marquee>
                            }
                        </song-title>
                        <artist-name>
                            • { meta!.artist }
                        </artist-name>
                    </text>
                </info>
                
                <actions>
                    <button
                        onClick={() => {
                            if (!meta || !isCurrent) return;
                            if (!isFavorite) player.setFavorite(meta.path);
                            else player.setUnfavorite(meta.path);
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        { isFavorite ? <FaHeart /> : <FaRegHeart /> }
                    </button>
                    <button
                        onClick={() => {
                            player.setIsShuffle(!player.isShuffle);
                        }}
                    >
                        { player.isShuffle ? <FaShuffle /> : <FaLongArrowAltRight /> }
                    </button>
                    <button
                        onClick={() => {
                            if (!isCurrent) return;
                            player.setLoopMode(
                                player.loopMode === RepeatMode.None ?
                                    RepeatMode.List :
                                        player.loopMode === RepeatMode.List ?
                                            RepeatMode.Track  :
                                            RepeatMode.None );
                        }}
                    >
                        { player.loopMode === RepeatMode.None ?
                            <FaArrowDownWideShort /> :
                                player.loopMode === RepeatMode.List ?
                                    <ImLoop /> :
                                    <FaArrowsRotate /> }
                    </button>
                    <button
                        onClick={() => {
                            if (!isCurrent) return;
                            player.setIsPlaying(!player.isPlaying);
                        }}
                    >
                        { isCurrent && player.isPlaying ? <FaPause /> : <FaPlay /> }
                    </button>
                </actions>
            </content>
            
            <ProgressBar 
                value={ isCurrent ? progressPercent : 0 }
                height="3px"
            />
        </docker-body>
    );
}