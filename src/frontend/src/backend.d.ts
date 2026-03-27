import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Tutorial {
    id: bigint;
    title: string;
    duration: string;
    thumbnailUrl: string;
    createdAt: Time;
    tags: Array<string>;
    description: string;
    author: string;
    viewCount: bigint;
    category: string;
    rating: number;
    videoUrl: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllTutorials(): Promise<Array<Tutorial>>;
    getCategories(): Promise<Array<string>>;
    getTrendingTutorials(): Promise<Array<Tutorial>>;
    getTutorialsByCategory(category: string): Promise<Array<Tutorial>>;
    incrementViewCount(id: bigint): Promise<void>;
}
