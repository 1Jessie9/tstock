import { IValueItem } from "./value-item.interface";

export interface ICardProduct {
    id: number,
    name: string,
    description: string,
    score: number,
    price: number,
    favorite: boolean,
    totalScores: number,
    gallerySrc: string[],
    specifications: IValueItem[];
    featureInfo?: IFeature;
}

export interface IFeature {
    imgSrc: string,
    title?: string,
    description?: string,
    features: IValueItem[],
}