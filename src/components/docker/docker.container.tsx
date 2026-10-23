import {useOngaku} from "../../providers/ongaku.context.tsx";
import Docker from "./docker.tsx";
import "./docker.container.style.scss"

export default function DockerContainer() {
    return (
        <dockercontainer>
            <Docker />
        </dockercontainer>
    );
}