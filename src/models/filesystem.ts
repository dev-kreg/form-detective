// can represent a directory or a file
export interface DirectoryEntry {
    name: string;
    children?: DirectoryEntry[];
    content?: string;
    modifiedAt?: Date;
    fileSize?: number;
}
