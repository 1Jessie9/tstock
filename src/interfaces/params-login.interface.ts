import { IUser } from "./user.interface";

export interface IParamsUser {
    email: string,
    password: string,
}

export interface IParamsRegisterUser {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export interface AuthResponse {
    message: string;
    access_token: string;
    user: IUser,
}