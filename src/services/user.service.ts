
import { Injectable } from '@angular/core';
import { IParamsUser } from '../interfaces/params-login.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userData!: IParamsUser;

    constructor(
    ) {
    }

    async signUp(forms: IParamsUser) {
        try {
            //TODO Crear cuenta y guardar token en sessionStorage

            return {
                "success": false,
            };
        } catch (err) {
            throw err;
        }
    }

    async logIn(forms: IParamsUser) {
        try {
            //TODO Crear cuenta y guardar token en sessionStorage
            localStorage.setItem("email", forms.email);
            localStorage.setItem("password", forms.password);

            const response = await fetch("./assets/data/users.json");
            const user = await response.json();

            this.userData = user[0];
            console.log(this.userData)
            return {
                "success": true,
            };
        } catch (err) {
            throw err;
        }
    }
}
