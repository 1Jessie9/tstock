import { IValueItem } from "./value-item.interface";

export interface ICardProduct {
    id: number,
    title: string,
    description: string,
    score: number,
    price: number,
    favorite: boolean,
    totalScores: number,
    gallery: IImage[],
    specifications: IValueItem[];
    featureInfo?: IFeature;
}

export interface IFeature {
    imgSrc: string,
    title?: string,
    description?: string,
    features: IValueItem[],
}

export interface IImage{
    id: number,
    image_path: string,
}