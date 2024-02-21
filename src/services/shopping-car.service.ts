
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCarService {
    private shoppingCarSubject = new BehaviorSubject<number[]>([]);
    public shoppingCar = this.shoppingCarSubject.asObservable();

    constructor() {
        this.loadInitialCar();
    }

    private loadInitialCar() {
        const carRaw = localStorage.getItem("shoppingCar");
        const initialCar = carRaw !== null ? JSON.parse(carRaw) : [];
        this.shoppingCarSubject.next(initialCar);
    }

    getShoppingCar() {
        return this.shoppingCarSubject.value;
    }

    async addProductCar(idProduct: number) {
        try {
            const existInCar = this.shoppingCarSubject.value.includes(idProduct);
            if (!existInCar) {
                const updatedCar = [...this.shoppingCarSubject.value, idProduct];
                this.shoppingCarSubject.next(updatedCar);
                localStorage.setItem("shoppingCar", JSON.stringify(this.shoppingCarSubject.value))
            }

            return {
                "success": true
            };
        } catch (err) {
            throw err;
        }
    };

    async removeShoppingCar(idProduct: number) {
        try {
            const index = this.shoppingCarSubject.value.findIndex(item => item === idProduct);
            if (index != -1 ) {
                this.shoppingCarSubject.value.splice(index, 1);
                localStorage.setItem("shoppingCar", JSON.stringify(this.shoppingCarSubject.value))
                this.shoppingCarSubject.next(this.shoppingCarSubject.value);
            }

            return {
                "success": true
            };
        } catch (err) {
            throw err;
        }
    };

    isProductInCar(idProduct: number): boolean {
        return this.shoppingCarSubject.value.includes(idProduct);
    }

}
