import { unloadAudioElement } from "./audio";

const activeAudios = new Set<HTMLAudioElement>();

const AudioRegistry = {
    register(audio: HTMLAudioElement) {
        activeAudios.add(audio);
    },

    deregister(audio: HTMLAudioElement) {
        activeAudios.delete(audio);
    },

    stopAll() {
        activeAudios.forEach((audio) => {
            if (audio) {
                unloadAudioElement(audio);
            }
        });
        activeAudios.clear();
    }
};

export default AudioRegistry;