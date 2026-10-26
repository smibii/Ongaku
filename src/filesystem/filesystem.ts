import { DirEntry, readDir } from "@tauri-apps/plugin-fs";
import { IFile, IFolder } from "./filesystem.type";
import defaultCover from "../assets/default-cover.png";
import { getAudioMetadata } from "../audio/audio.meta";
import { MusicBaseDir } from "../providers/directory.context.constant";

const supportedFormats = [".mp3", ".m4a", ".aac", ".wav", ".ogg", ".opus", ".flac", ".webm"]
function isFormatSupported(name: string): boolean {
    for (let format of supportedFormats) {
        if (name.endsWith(format)) return true;
    }
    return false;
}

async function dirEntryToFile(path: string, entries: DirEntry[]): Promise<IFile[]> {
    const files: IFile[] = [];

    for (let file of entries) {
        const meta = await getAudioMetadata(path + "/" + file.name);
        files.push({
            path: path + "/" + file.name,
            isDir: file.isDirectory,
            thumbnail: file.isDirectory ? defaultCover : meta.coverUrl
        });
    }

    return files;
}

export async function getFolderFiles(path: string): Promise<IFolder> {
    if (!path.startsWith(MusicBaseDir)) path = MusicBaseDir + path.trim();

    const entries: DirEntry[] = await readDir(path);
    const folders = entries.filter(f => f.isDirectory && !f.name.startsWith(".")).sort((a, b) => a.name.localeCompare(b.name));
    if (path !== MusicBaseDir) folders.unshift({
        isDirectory: true,
        isFile: false,
        isSymlink: false,
        name: "..."
    });

    const files = entries.filter(f => f.isFile && isFormatSupported(f.name)).sort((a, b) => a.name.localeCompare(b.name));

    return {
        path,
        files: [
            ...await dirEntryToFile(path, folders),
            ...await dirEntryToFile(path, files)
        ]
    };
}