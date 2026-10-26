import AudioMetadata from "../../audio/audio.meta.type";

export default interface IDockerParam {
    meta: AudioMetadata | null;
    type: "previouse" | "current" | "next";
}