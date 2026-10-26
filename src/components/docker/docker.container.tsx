import Docker from "./docker.tsx";
import "./docker.container.style.scss"
import IDockerParam from "./docker.type.ts";

export default function DockerContainer(
    { meta, type }: IDockerParam
) {
    return (
        <docker-container>
            <Docker meta={ meta } type={ type } />
        </docker-container>
    );
}