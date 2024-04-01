import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);
    if (userService.isAuth()) {
        router.navigateByUrl("/");
        return false;
    }
    return true;
}