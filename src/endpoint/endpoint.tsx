import { ReactNode, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import allowedEndpoints from "./endoint.constant.tsx";
import { useOngaku } from "../providers/ongaku.context.tsx";

export default function EndpointNode(): ReactNode {
    const ongaku = useOngaku();

    const animationRef = useRef<number | null>(null);
    const hueRef = useRef<number>(parseInt(document.body.style.getPropertyValue("--hue")) || 0);

    useEffect(() => {
        document.body.className = ongaku.lightMode ? "light-mode" : "";
        document.body.style.setProperty("--hue", ongaku.backgroundHue.toString());
    }, [ongaku.lightMode, ongaku.backgroundHue]);

    useEffect(() => {
        if (ongaku.rainbowMode) {
            const loop = () => {
                hueRef.current = (hueRef.current + 0.5) % 360; 
                document.body.style.setProperty("--hue", Math.floor(hueRef.current).toString());
                animationRef.current = requestAnimationFrame(loop);
            };
            
            animationRef.current = requestAnimationFrame(loop);
        } else {
            if (animationRef.current) {
                document.body.style.setProperty("--hue", ongaku.backgroundHue.toString());
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [ongaku.rainbowMode]);

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