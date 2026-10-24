import { ReactNode, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaPlay, FaPause } from "react-icons/fa";
import ProgressBar from "../progressbar/progressbar";
import "./docker.body.style.scss";
import AudioMetadata from "../../audio/audio.meta.type";
import { useOngaku } from "../../providers/ongaku.context";
import { setMediaPosition, setMediaTrack } from "../../notification/notification";
import { RepeatMode } from "tauri-plugin-media-api";

export default function DockerBody({
        meta
    }: { meta: AudioMetadata }
): ReactNode {
    const ongaku = useOngaku();
    const [currentTime, setCurrentTime] = useState<number>(0);

    const song = ongaku.player.currentSong;
    const currentAudioWrapper = song?.audio;
    const durationSec = currentAudioWrapper?.durationSec || 0;
    const audioElement = currentAudioWrapper?.audioElement || null;

    useEffect(() => {
        if (!audioElement) {
            setCurrentTime(0);
            return;
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
            setMediaPosition(audioElement.currentTime);
        };

        audioElement.addEventListener("timeupdate", handleTimeUpdate);
        setCurrentTime(audioElement.currentTime);

        if (song)
            setMediaTrack({
                title: song.title,
                artist: song.artist,
                cover: song.coverUrl!,
                duration: song.audio?.durationSec!,
                playing: ongaku.player.isPlaying,
                shuffle: false,
                loop: RepeatMode.None
            });

        return () => {
            audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [audioElement]);

    useEffect(() => {
        if (!audioElement) return;

        if (ongaku.player.isPlaying && audioElement.paused) {
            audioElement.play().catch((err) => console.log("Playback interrupted:", err));
        } else if (!ongaku.player.isPlaying && !audioElement.paused) {
            audioElement.pause();
        }
    }, [ongaku.player.isPlaying, audioElement]);

    const progressPercent = durationSec > 0 ? (currentTime / durationSec) * 100 : 0;

    return (
        <docker-body>
            <content>
                <info>
                    <img src={ meta.coverUrl || undefined } loading="lazy" alt="Cover" />
                    <text>
                        <song-title>
                            <marquee scrollamount="2">
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
                        onClick={() => {
                            ongaku.player.setIsPlaying(!ongaku.player.isPlaying);
                        }}
                    >
                        { !ongaku.player.isPlaying ? <FaPlay /> : <FaPause /> }
                    </button>
                </actions>
            </content>

            <ProgressBar 
                value={progressPercent}
                height="3px"
            />
        </docker-body>
    );
}