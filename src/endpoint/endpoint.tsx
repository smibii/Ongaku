import { ReactNode, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import allowedEndpoints from "./endoint.constant.tsx";
import { useOngaku } from "../providers/ongaku.context.tsx";
import { JSX } from "react/jsx-dev-runtime";
import { initMediaNotification } from "../notification/notification.ts";

export default function EndpointNode(): ReactNode {
    const ongaku = useOngaku();

    const animationRef = useRef<number | null>(null);
    const hueRef = useRef<number>(parseInt(document.body.style.getPropertyValue("--hue")) || 0);

    useEffect(() => {
        initMediaNotification(
            () => {
                ongaku.player.setIsPlaying(ongaku.player.isPlaying);
            },
            () => {

            },
            () => {

            },
            () => {

            },
            () => {

            }
        );
    }, []);

    useEffect(() => {
        document.body.className = ongaku.lightMode ? "light-mode" : "";
        document.body.style.setProperty("--hue", ongaku.backgroundHue.toString());
    }, [ongaku.lightMode, ongaku.backgroundHue]);

    useEffect(() => {
        if (ongaku.rainbowMode) {
            const loop = () => {
                hueRef.current = (hueRef.current + 0.5) % 360; 
                document.body.style.setProperty("--hue", Math.floor(hueRef.current).toString());
                animationRef.current = requestAnimationFrame(loop);
            };
            
            animationRef.current = requestAnimationFrame(loop);
        } else {
            if (animationRef.current) {
                document.body.style.setProperty("--hue", ongaku.backgroundHue.toString());
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [ongaku.rainbowMode]);

    useEffect(() => {
        if (!ongaku.player.currentSong) return;
        const song = ongaku.player.currentSong;

        if (!song.audio) return;
        const audio = song.audio;

        if (audio.audioElement.paused && ongaku.player.isPlaying) audio.audioElement.play();
        else if (!audio.audioElement.paused && !ongaku.player.isPlaying) audio.audioElement.pause();
    }, [ongaku.player.isPlaying]);

    return (
        <Routes>
            { _mapEndpoints() }
        </Routes>
    );
}

function _mapEndpoints(): JSX.Element[] {
    return allowedEndpoints.map(
        (point, index) => {
            return (
                <Route
                    key={index}
                    path={point.path}
                    element={point.element}
                />
            )
        }
    );
}