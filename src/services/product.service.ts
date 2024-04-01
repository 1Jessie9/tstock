
import { Injectable } from '@angular/core';
import { IParamsProduct } from '../interfaces/params-product.interface';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = environment.url;

    constructor(
        private http: HttpClient,
    ) {
    }

    async getSizesDisk() {
        try {
            const response = await fetch("./assets/data/sizeDisk.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getTypesDisk() {
        try {
            const response = await fetch("./assets/data/typeDisk.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getRams() {
        try {
            const response = await fetch("./assets/data/rams.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getBrands() {
        try {
            const response = await fetch("./assets/data/brands.json");
            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    async getProducts(params: IParamsProduct): Promise<any> {
        try {
            const queryParams = { params: new HttpParams({ fromObject: params as any }) };
            const result = await firstValueFrom(this.http.get<any>(`${this.baseUrl}/products`, queryParams));

            console.log(result)
            return result;
        } catch (error: any) {
            return {
                success: false,
                message: "Error, inténtalo de nuevo",
            };
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

    createProduct(productData: any): Observable<any> {
        const token = localStorage.getItem('access_token');
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };

        return this.http.post(`${this.baseUrl}/create-product`, productData, httpOptions);
    }

    async getProductById(id: string): Promise<any> {
        try {
            const queryParams = { params: new HttpParams({ fromObject: { id } as any }) };
            const result = await firstValueFrom(this.http.get<any>(`${this.baseUrl}/productId`, queryParams));

            console.log(result)
            return result;
        } catch (error: any) {
            return {
                success: false,
                message: "Error, inténtalo de nuevo",
            };
        }
    }

    async removeGalleryById(id: number): Promise<any> {
        try {
            const token = localStorage.getItem('access_token');
            const options = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                }),
                params: new HttpParams({ fromObject: { id } })
            };

            const result = await firstValueFrom(this.http.delete<any>(`${this.baseUrl}/delete-gallery`, options));

            console.log(result)
            return result;
        } catch (error: any) {
            return {
                success: false,
                message: "Error, inténtalo de nuevo",
            };
        }
    }

    async updateTitle(id: number, title: string): Promise<any> {
        try {
            const token = localStorage.getItem('access_token');
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                })
            };

            // Prepara el cuerpo de la solicitud con los datos a enviar
            const body = { id, title };

            const result = await firstValueFrom(this.http.put<any>(`${this.baseUrl}/update-title`, body, httpOptions));

            console.log(result);
            return result;
        } catch (error: any) {
            console.error('Error updating product title:', error);
            return {
                success: false,
                message: "Error, inténtalo de nuevo",
            };
        }
    }
}
