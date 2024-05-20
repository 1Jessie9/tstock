
import { Injectable } from '@angular/core';
import { AuthResponse, IParamsRegisterUser, IParamsUser } from '../interfaces/params-login.interface';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public userData: IUser | null = null;
    private baseUrl = environment.url;
    public authUser: boolean = false;

    constructor(
        private http: HttpClient,
    ) {
    }

    async signUp(userData: IParamsRegisterUser): Promise<any> {
        try {
            const result = await firstValueFrom(this.http.post<AuthResponse>(`${this.baseUrl}/register`, userData));

            localStorage.setItem("access_token", result.access_token);
            return {
                success: true,
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Las contraseñas deben ser iguales y mayor de 8 dígitos",
            };
        }
    }

    async logIn(loginData: IParamsUser) {
        try {
            const result = await firstValueFrom(this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginData));

            localStorage.setItem("access_token", result.access_token);
            await this.getUserInfo();
            return {
                success: true,
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Las credenciales son incorrectas.",
            };
        }
    }

    isAuth() {
        const token = localStorage.getItem('access_token');
        this.authUser = token && token.length > 1 ? true : false;
        return this.authUser;
    }

    async getUserInfo() {
        try {
            const token = localStorage.getItem('access_token');
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
            };

            const result = await firstValueFrom(this.http.get<IUser>(`${this.baseUrl}/user`, httpOptions));

            this.userData = result;
            return this.userData
        } catch (error: any) {
            return null;
        }
    }

    async logOut() {
        try {
            const token = localStorage.getItem('access_token');
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
            };

            const result = await firstValueFrom(this.http.post<{ message: string }>(`${this.baseUrl}/logout`, {}, httpOptions));

            if (result) {
                localStorage.removeItem('access_token');
                this.userData = null;
                this.authUser = false;
            }
            return result.message;
        } catch (error: any) {
            return console.log(error);
        }
    }

    checkSuperAdminPermission(): Observable<any> {
        const token = localStorage.getItem('access_token');
        if (token && token.length < 1) return of(null);
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
        return this.http.get<any>(`${this.baseUrl}/check-superadmin-permission`, httpOptions);
    }
}
