import {
    mediaControls,
    PlaybackStatus
} from "tauri-plugin-media-api";
import { MediaTrack } from "./notification.type";

let initialized = false;

export async function initMediaNotification(
    onTogglePlay: () => void,
    onToggleShuffle: () => void,
    onToggleLoop: () => void,
    onNext: () => void,
    onPrevious: () => void
) {
    if (!initialized) {
        await mediaControls.initialize("ongaku", "Ongaku");
        initialized = true;
    }

    mediaControls.setEventHandler(onTogglePlay);
    mediaControls.setEventHandler(onToggleShuffle);
    mediaControls.setEventHandler(onToggleLoop);
    mediaControls.setEventHandler(onNext);
    mediaControls.setEventHandler(onPrevious);
}

export async function setMediaTrack(track: MediaTrack) {
    if (!initialized) return;

    mediaControls.updateNowPlaying({
        title: track.title,
        artist: track.artist,
        duration: track.duration,
        artworkUrl: track.cover
    }, {
        playbackRate: 1,
        position: 0,
        repeatMode: track.loop,
        shuffle: track.shuffle,
        status: track.playing ? PlaybackStatus.Playing : PlaybackStatus.Paused
    });
}

export async function setMediaPosition(position: number) {
    if (!initialized) {
        return;
    }

    await mediaControls.setPosition(position);
}

export async function seekFromMediaControls(position: number) {
    if (!initialized) {
        return;
    }

    await mediaControls.setPosition(position);
}

export async function mediaNext() {
    if (!initialized) {
        return;
    }

    await mediaControls.next();
}

export async function mediaPrevious() {
    if (!initialized) {
        return;
    }

    await mediaControls.previous();
}

export async function clearMediaNotification() {
    if (!initialized) {
        return;
    }

    await mediaControls.clearNowPlaying();
}