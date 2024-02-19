import { Component, Input, OnInit } from '@angular/core';
import { ICardProduct } from '../../interfaces/card-product.interface';
import { IValueItem } from '../../interfaces/value-item.interface';
import { faStar, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

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

	constructor(
		private router: Router,
	) {

	}

    ngOnInit() {
        this.scoreProduct = [...Array(this.infoProduct.score).keys()];
    }

    navigateProduct() {
        this.router.navigateByUrl("/detail-product/" + this.infoProduct.id);
    }

    async addShoppingCar() {
        // TODO agregar servicio para agregar al carrito
        console.log("agregar carttio")
    }

    async addFavorite() {
        // TODO agregar a favorito
        this.infoProduct.favorite = true;
    }
}
