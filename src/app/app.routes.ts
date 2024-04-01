import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/logged-in-user.guard';
import { CreateProductComponent } from './create-product/create-product.component';

export const routes: Routes = [
    {
		path: 'login',
        component: LoginComponent,
		canActivate: [AuthGuard],
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
        path: 'create-product',
        component: CreateProductComponent,
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/list-products',
    }
];