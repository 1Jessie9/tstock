import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ShoppingCarService } from '../../services/shopping-car.service';
import { Subscription, filter } from 'rxjs';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        FontAwesomeModule,
        RouterLink,
    ],
    providers: [
        HttpClientModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    animations: [
        trigger('verticalFade', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-20%)' }),
                animate('200ms', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
            transition(':leave', [
                animate('200ms', style({ opacity: 0, transform: 'translateY(-20%)' })),
            ]),
        ]),
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public hideLoggedIn: boolean = false;
    public totalCart: number = 3;
    public icons = {
        faCartShopping,
        faChevronDown,
        faRightFromBracket
    }
    private carSubscription!: Subscription;
    public showMenu: boolean = false;

    constructor(
        private router: Router,
        private shoppingCarService: ShoppingCarService,
        public userService: UserService,
    ) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
            const noShow = [
                '/login',
            ];

            this.hideLoggedIn = false;
            if (this.userService.isAuth()) {
                this.getUser();
            } else {
                this.hideLoggedIn = noShow.includes(event.url);
            }
        });
    }

    async ngOnInit() {
        this.carSubscription = this.shoppingCarService.shoppingCar.subscribe({
            next: (car) => {
                this.totalCart = car.length;
            }
        });
    }

    async getUser() {
        await this.userService.getUserInfo();
    }

    async ngOnDestroy() {
        this.carSubscription?.unsubscribe();
    }

    async showMenuChange() {
        this.showMenu = !this.showMenu;
    }

    async logout() {
        const message = await this.userService.logOut();
    }
}
