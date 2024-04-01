import { Component, Input, OnInit } from '@angular/core';
import { ICardProduct } from '../../interfaces/card-product.interface';
import { faStar, faCartShopping, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ShoppingCarService } from '../../services/shopping-car.service';

@Component({
    selector: 'app-card-product',
    standalone: true,
    imports: [
        FontAwesomeModule,
    ],
    templateUrl: './card-product.component.html',
    styleUrl: './card-product.component.scss'
})
export class CardProductComponent implements OnInit {
    @Input() infoProduct!: ICardProduct;
    public scoreProduct: number[] = [];
    public faStar = faStar;
    public faCartShopping = faCartShopping;
    public faHeart = faHeart;
    public faTrash = faTrash;
    public existInCar: boolean = false;

    constructor(
        private router: Router,
        private productService: ProductService,
        private shoppingCarService: ShoppingCarService,
    ) {

    }

    async ngOnInit() {
        console.log(this.infoProduct.gallery);
        this.scoreProduct = [...Array(this.infoProduct.score).keys()];
        await this.checkProductInCart();
    }

    async checkProductInCart() {
        this.existInCar = this.shoppingCarService.isProductInCar(this.infoProduct.id);
    }

    navigateProduct() {
        this.router.navigateByUrl("/detail-product/" + this.infoProduct.id);
    }

    async addShoppingCar() {
        const response = await this.shoppingCarService.addProductCar(this.infoProduct.id);
        //TODO agregar mensaje de agregado
        if (response.success) {
            console.log("Producto agregado");
            this.checkProductInCart();
        }
    }

    async removeShoppingCar() {
        const response = await this.shoppingCarService.removeShoppingCar(this.infoProduct.id);
        //TODO agregar mensaje de agregado
        if (response.success) { 
            console.log("Producto removido"); 
            this.checkProductInCart();
        }
    }

    async addFavorite() {
        const response = await this.productService.productFavorite(this.infoProduct.id, this.infoProduct.favorite);
        if (response.success) this.infoProduct.favorite = !this.infoProduct.favorite;
    }

}
