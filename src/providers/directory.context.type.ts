export default interface IDirectoryContext {
    currentPath: string;
    currentDirectory: IDirectory | null;
    sortType: SortType;
    setSortType: (value: SortType) => void;
    getDirectory: (path: string) => Promise<IDirectory | null>;
    goToDirectory: (path: string) => Promise<void>;
    getFilePaths: (directory?: IDirectory | null) => string[];
}

export interface IDirectory {
    path: string,
    files: IDirFile[]
}

export interface IDirFile {
    path: string,
    name: string,
    isDir: boolean,
    thumbnail: string
}

export type SortType = "down" | "up";