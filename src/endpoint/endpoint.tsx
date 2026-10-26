import { ReactNode, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import allowedEndpoints from "./endoint.constant.tsx";
import { JSX } from "react/jsx-dev-runtime";
import { usePlayer } from "../providers/player.context.tsx";

export default function EndpointNode(): ReactNode {
    const player = usePlayer();

    useEffect(() => {
        const scroll = document.getElementsByTagName("docker-scroll")[0];
        scroll.scrollTo(window.innerWidth, 0);
    }, []);

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