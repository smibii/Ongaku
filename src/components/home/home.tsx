import { ReactNode } from "react";
import { useOngaku } from "../../providers/ongaku.context.tsx";

export default function Home(): ReactNode {
    const ongaku = useOngaku();

    return (
        <home>
            <button
                onClick={
                    () => {
                        ongaku.setShowDocker(!ongaku.showDocker);
                    }
                }
            >
                Click!
            </button>
        </home>
    );
}