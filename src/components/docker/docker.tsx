import {useOngaku} from "../../providers/ongaku.context.tsx";
import "./docker.style.scss"

export default function Docker() {
    const ongaku = useOngaku();

    return (
        ongaku.showDocker &&
        <docker
            className=""
        >
            Docker
        </docker>
    );
}