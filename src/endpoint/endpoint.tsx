import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import allowedEndpoints from "./endoint.constant.tsx";

export default function EndpointNode(): ReactNode {
    return (
        <Routes>
            { _mapEndpoints() }
        </Routes>
    );
}

function _mapEndpoints(): Map<ReactNode> {
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