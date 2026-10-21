import {createContext, ReactNode, useContext, useState} from "react";
import IOngakuContext from "./ongaku.context.type.ts";

export const OngakuContext = createContext<IOngakuContext>();

export function useOngaku(): IOngakuContext {
    const context: IOngakuContext = useContext(OngakuContext);
    if (!context) throw new Error("Context is not set!");
    return context;
}

export function OngakuProvider(
    { children }: { children: ReactNode }
): ReactNode {
    const [showDocker, setShowDocker] = useState<boolean>(true);

    return (
        <OngakuContext.Provider
            value={{
                showDocker,
                setShowDocker
            }}
        >
            { children }
        </OngakuContext.Provider>
    );
}