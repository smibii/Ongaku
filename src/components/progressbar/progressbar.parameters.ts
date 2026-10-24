import { CSSProperties } from "react";

export default interface ProgressBarParam {
    value: number;
    max?: number;
    clickable?: boolean;
    width?: string;
    height?: string;
    style?: CSSProperties;
}