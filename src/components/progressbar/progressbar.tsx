import { ReactNode } from "react";
import ProgressBarParam from "./progressbar.type";
import "./progressbar.style.scss"

export default function ProgressBar({
        value,
        max = 100,
        clickable = false,
        width = "100%",
        height="5px",
        style = {} 
    }: ProgressBarParam
): ReactNode {
    return (
        <progress-bar
            style={{
                width,
                height,
                ...style
            }}
        >
            <progress-track
                style={{
                    width: max / 100 * value + "%",
                    borderRadius: height.endsWith("px") ? parseInt(height.replace("px", "")) / 2 : "0px"
                }}
            />
        </progress-bar>
    );
}