
import { Injectable } from '@angular/core';
import { IParamsProduct } from '../interfaces/params-product.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
    ) {
    }

    async getSizesDisk() {
        try {
            const response = await fetch("/assets/data/sizeDisk.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getTypesDisk() {
        try {
            const response = await fetch("/assets/data/typeDisk.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getRams() {
        try {
            const response = await fetch("/assets/data/rams.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getBrands() {
        try {
            const response = await fetch("/assets/data/brands.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getProducts(params: IParamsProduct) {
        try {
            const response = await fetch("/assets/data/products.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async productFavorite(idCard: number, favorite: boolean) {
        try {
            //TODO Agregar o quitar favorito
            return {
                "success": true,
                "message": "¡Se ha agregado como favorito!"
            };
        } catch (err) {
            throw err;
        }
    }
}
