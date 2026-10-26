import { ReactNode } from "react";
import { useOngaku } from "../../providers/ongaku.context.tsx";
import { usePlayer } from "../../providers/player.context.tsx";
import { useDirectory } from "../../providers/directory.context.tsx";
import "./home.style.scss";

export default function Home(): ReactNode {
    const ongaku = useOngaku();
    const player = usePlayer();
    const directory = useDirectory();

    return (
        <home>
            <content>

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
                            player.loadSongByPath(e.currentTarget.value);
                        }
                    }
                />

                {/* <input
                    onInput={
                        e => {
                            player.loadPlaylistPath(e.currentTarget.value);
                        }
                    }
                /> */}

                <textarea
                    onInput={
                        e => {
                            player.setPlaylist(e.currentTarget.value.split("?"));
                        }
                    }
                />

                {directory.currentPath}
                {
                    directory.currentDirectory?.files.map((f, i) => {
                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    if (f.isDir) directory.goToDirectory(f.path);
                                    else {
                                        const paths = directory.getFilePaths();
                                        player.setPlaylist(paths);
                                    }
                                }}
                            >
                                {f.name} {f.isDir ? "Directory" : "File"}
                            </button>
                        );
                    })
                }
            </content>
        </home>
    );
}