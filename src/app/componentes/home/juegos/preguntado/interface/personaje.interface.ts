export interface Personaje {
    data: Data;
}

export interface Data {
    results: Result[];
}

export interface Result {
    name: string;
    description: string;
    thumbnail: Thumbnail;
}

export interface Thumbnail {
    path: string;
    extension: string;
}

