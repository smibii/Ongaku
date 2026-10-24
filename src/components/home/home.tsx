import { ReactNode } from "react";
import { useOngaku } from "../../providers/ongaku.context.tsx";
import "./home.style.scss";

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
        </home>
    );
}