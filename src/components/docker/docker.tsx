import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import IDockerParam from "./docker.type";
import { useOngaku } from "../../providers/ongaku.context";
import { usePlayer } from "../../providers/player.context";
import DockerBody from "./docker.body";
import "./docker.style.scss";

export default function Docker(
    { meta, type }: IDockerParam
) : ReactNode {
    const ongaku = useOngaku();
    const player = usePlayer();

    const isCurrent = type === "current";

    const ref = useRef<HTMLElement>(null);
    const [intersectionRatio, setIntersectionRatio] = useState<number>(0);

    const observer = useMemo(() =>
        new IntersectionObserver(
            ([entry]) => {
                setIntersectionRatio(entry.intersectionRatio)
            }
        )
    , [ref]);

    useEffect(() => {
        if (isCurrent || !ref.current) return;
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ ref ]);

    useEffect(() => {
        if (isCurrent || !intersectionRatio
            || Date.now() - player.lastSongChange < 400) return;

        setTimeout(() => {
            if (meta) {
                if (type === "next") player.next();
                else player.previous();
            }

            if (meta) return;
            const scroll = document.getElementsByTagName("docker-scroll")[0];
            scroll.children[1].scrollIntoView({
                behavior: "smooth"
            });
        }, meta ? 700 : 300);
    }, [ intersectionRatio ]);

    return (
        <docker
            ref={ ref }
            className={
                !isCurrent && Date.now() - player.lastSongChange < 400 || 
                meta && ongaku.showDocker && player.currentSong 
                    ? "active" : ""
            }
        >
            { meta && (
                <>
                    <DockerBody meta={ meta } type={ type } />

                    <halo>
                        <img src={ meta.coverUrl! } loading="lazy" />
                    </halo>
                </>
            )}
        </docker>
    );
}