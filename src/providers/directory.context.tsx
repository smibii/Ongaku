import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import IDirectoryContext, { IDirectory, IDirFile, SortType } from "./directory.context.type.ts";
import IContextParam from "./context.type.ts";
import { DirEntry, readDir } from "@tauri-apps/plugin-fs";
import defaultCover from "../assets/default-cover.png";
import { getAudioMetadata } from "../audio/audio.meta.ts";
import { MusicBaseDir } from "./directory.context.constant.ts";

export const DirectoryContext = createContext<IDirectoryContext | null>(null);

export function useDirectory(): IDirectoryContext {
    const context: IDirectoryContext | null = useContext(DirectoryContext);
    if (!context) throw new Error("Context is not set!");
    return context;
}

export default function DirectoryProvider(
    { children }: IContextParam
): ReactNode {
    /*
     * Export states
     */
    const [currentPath, setCurrentPath] = useState<string>("");
    const [currentDirectory, setCurrentDirectory] = useState<IDirectory | null>(null);
    const [sortType, setSortType] = useState<SortType>("down");

    useEffect(() => {
        goToDirectory(MusicBaseDir);
    }, []);

    const supportedFormats = [".mp3", ".m4a", ".aac", ".wav", ".ogg", ".opus", ".flac", ".webm"]
    function isFormatSupported(name: string): boolean {
        for (let format of supportedFormats) {
            if (name.endsWith(format)) return true;
        }
        return false;
    }

    async function dirEntryConvert(path: string, entries: DirEntry[]): Promise<IDirFile[]> {
        const files: IDirFile[] = [];

        for (let file of entries) {
            files.push({
                path: path + "/" + file.name,
                name: file.name,
                isDir: file.isDirectory,
                thumbnail: defaultCover
            });
        }

        return files;
    }

    function getSortFunction(): (a: DirEntry, b: DirEntry) => number {
        switch (sortType) {
            case "down":
                return (a, b) => a.name.localeCompare(b.name);
            case "up":
                return (a, b) => b.name.localeCompare(a.name);
        }
    }

    async function getDirectory(path: string): Promise<IDirectory | null> {
        if (!path.startsWith(MusicBaseDir)) path = MusicBaseDir + path.trim();

        try {
            const entries: DirEntry[] = await readDir(path);
            const folders = entries
                            .filter(f => f.isDirectory && !f.name.startsWith("."))
                            .sort(getSortFunction());
            console.log(folders.map(f => f.name));

            if (path !== MusicBaseDir) folders.unshift({
                isDirectory: true,
                isFile: false,
                isSymlink: false,
                name: ".."
            });
    
            const files = entries
                            .filter(f => f.isFile && isFormatSupported(f.name))
                            .sort(getSortFunction());
            console.log(files.map(f => f.name));
    
            return {
                path,
                files: [
                    ...await dirEntryConvert(path, folders),
                    ...await dirEntryConvert(path, files)
                ]
            };
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async function goToDirectory(path: string): Promise<void> {
        if (path.endsWith("..")) {
            const parts = currentPath.split("/");
            parts.pop();
            path = parts.join("/");
        }

        const directory = await getDirectory(path);
        console.log(path, directory);
        if (!directory) return;

        setCurrentPath(path);
        setCurrentDirectory(directory);
    }

    function getFilePaths(directory: IDirectory | null = currentDirectory): string[]{
        return directory?.files.filter(f => !f.isDir).map(f => f.path) || [];
    }

    return (
        <DirectoryContext.Provider
            value={{
                currentPath,
                currentDirectory,
                sortType,
                setSortType,
                getDirectory,
                goToDirectory,
                getFilePaths
            }}
        >
            { children }
        </DirectoryContext.Provider>
    );
}