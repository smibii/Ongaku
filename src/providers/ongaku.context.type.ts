export default interface IOngakuContext {
    lightMode: boolean;
    setLightMode: (value: boolean) => void;
    rainbowMode: boolean;
    setRainbowMode: (value: boolean) => void;

    showDocker: boolean;
    setShowDocker: (value: boolean) => void;
    backgroundHue: number;
    setBackgroundHue: (value: number) => void;
}