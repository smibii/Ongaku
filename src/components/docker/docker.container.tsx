import Docker from "./docker.tsx";
import "./docker.container.style.scss"

export default function DockerContainer() {
    return (
        <docker-container>
            <Docker />
        </docker-container>
    );
}