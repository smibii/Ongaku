import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import IOngakuContext from "./ongaku.context.type.ts";
import IContextParam from "./context.type.ts";

export const OngakuContext = createContext<IOngakuContext | null>(null);

export function useOngaku(): IOngakuContext {
    const context: IOngakuContext | null = useContext(OngakuContext);
    if (!context) throw new Error("Context is not set!");
    return context;
}

export default function OngakuProvider(
    { children }: IContextParam
): ReactNode {
    /*
     * Export states
     */
    const [lightMode, setLightMode] = useState<boolean>(false);
    const [rainbowMode, setRainbowMode] = useState<boolean>(false);

    const [showDocker, setShowDocker] = useState<boolean>(true);
    const [backgroundHue, setBackgroundHue] = useState<number>(200);
    
    /*
     * Hue rainbow shift states
     */
    const animationRef = useRef<number | null>(null);
    const hueRef = useRef<number>(parseInt(document.body.style.getPropertyValue("--hue")) || 0);

    /*
     * Hue rainbow shift animation
     */
    useEffect(() => {
        if (rainbowMode) {
            const loop = () => {
                hueRef.current = (hueRef.current + 0.5) % 360; 
                document.body.style.setProperty("--hue", Math.floor(hueRef.current).toString());
                animationRef.current = requestAnimationFrame(loop);
            };
            
            animationRef.current = requestAnimationFrame(loop);
        } else {
            if (animationRef.current) {
                document.body.style.setProperty("--hue", backgroundHue.toString());
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [rainbowMode]);

    /*
     * Hue update
     */
    useEffect(() => {
        document.body.className = lightMode ? "light-mode" : "";
        document.body.style.setProperty("--hue", backgroundHue.toString());
    }, [lightMode, backgroundHue]);

    return (
        <OngakuContext.Provider
            value={{
                lightMode,
                setLightMode,
                rainbowMode,
                setRainbowMode,

                showDocker,
                setShowDocker,
                backgroundHue,
                setBackgroundHue
            }}
        >
            { children }
        </OngakuContext.Provider>
    );
}