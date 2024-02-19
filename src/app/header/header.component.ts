import { Component } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    public isLoggedIn: boolean = false;
    public user: IUser | null = null;
    public totalCart: number = 3;
    public icons = {
        faCartShopping,
    }

    constructor(
        private router: Router,
    ) {
    }

    navigateProduct() {
        this.router.navigateByUrl("/list-products");
    }
}
