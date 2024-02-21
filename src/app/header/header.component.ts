import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ShoppingCarService } from '../../services/shopping-car.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isLoggedIn: boolean = false;
    public user: IUser | null = null;
    public totalCart: number = 3;
    public icons = {
        faCartShopping,
    }
    private carSubscription!: Subscription;

    constructor(
        private router: Router,
        private shoppingCarService: ShoppingCarService,
    ) {
    }

    async ngOnInit() {
        this.carSubscription = this.shoppingCarService.shoppingCar.subscribe({
            next: (car) => {
                this.totalCart = car.length;
            }
        });
    }

    async ngOnDestroy() {
        if (this.carSubscription) this.carSubscription.unsubscribe();
    }

    navigateProduct() {
        this.router.navigateByUrl("/list-products");
    }
}
