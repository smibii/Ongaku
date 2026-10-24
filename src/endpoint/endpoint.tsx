import { ReactNode, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import allowedEndpoints from "./endoint.constant.tsx";
import { useOngaku } from "../providers/ongaku.context.tsx";

export default function EndpointNode(): ReactNode {
    const ongaku = useOngaku();

    useEffect(() => {
        document.body.className = ongaku.lightMode ? "light-mode" : "";
        document.body.style.setProperty("--hue", ongaku.backgroundHue.toString());
    }, [ongaku.lightMode, ongaku.backgroundHue]);

    return (
        <Routes>
            { _mapEndpoints() }
        </Routes>
    );
}

function _mapEndpoints(): React.JSX.Element[] {
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