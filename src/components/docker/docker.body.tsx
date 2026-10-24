import { ReactNode, useState } from "react";
import { FaHeart, FaRegHeart, FaPlay, FaPause } from "react-icons/fa";
import ProgressBar from "../progressbar/progressbar";
import "./docker.body.style.scss";
import AudioMetadata from "../../audiometa/audiometa.type";
import { useOngaku } from "../../providers/ongaku.context";

export default function DockerBody({
        meta
    }: { meta: AudioMetadata }
): ReactNode {
    const ongaku = useOngaku();

    return (
        <docker-body>
            <content>
                <info>
                    <img src={ meta.coverUrl! } loading="lazy" />
                    <text>
                        <song-title>
                            <marquee
                                scrollamount="2"
                            >
                                { meta.title }
                            </marquee>
                        </song-title>
                        <artist-name>
                            • { meta.artist }
                        </artist-name>
                    </text>
                </info>

                <actions>
                    <button>
                        <FaHeart />
                    </button>
                    <button
                        onClick={
                            () => {
                                ongaku.player.setIsPlaying(!ongaku.player.isPlaying);
                            }
                        }
                    >
                        { !ongaku.player.isPlaying ? <FaPlay /> : <FaPause /> }
                    </button>
                </actions>
            </content>

            <ProgressBar 
                value={ 50 }
                height="3px"
            />
        </docker-body>
    );
}