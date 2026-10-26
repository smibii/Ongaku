export interface IFolder {
    path: string,
    files: IFile[]
}

export interface IFile {
    path: string,
    isDir: boolean,
    thumbnail: string
}