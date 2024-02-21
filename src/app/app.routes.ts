import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'list-products',
        component: ListProductsComponent
    },
    {
        path: 'detail-product/:id',
        component: DetailProductComponent,
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/list-products',
    }
];
