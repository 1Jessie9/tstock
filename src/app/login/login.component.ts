import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    public listSegment = [
        {
            id: 1,
            name: "Iniciar sesión",
        },
        {
            id: 2,
            name: "Crear cuenta",
        },
    ];
    public selectedSegment: number = 1;
    public loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    constructor(
        private router: Router,
        private userService: UserService,
        private formBuilder: FormBuilder,
    ) {
    }

    async selectSegment(segment: number) {
        this.selectedSegment = segment;
    }

    async onSubmit() {
        console.log('here')
        let response: boolean = false;
        if (this.selectedSegment === 1 && this.loginForm.valid) {
            const email = this.loginForm.get("email")?.value;
            const password = this.loginForm.get("password")?.value;

            if (email && password) {
                const { success } = await this.userService.logIn({
                    email,
                    password,
                });
                if (success) response = true;
            }
        } else if (this.selectedSegment === 2 && this.loginForm.valid) {
            const email = this.loginForm.get("email")?.value;
            const password = this.loginForm.get("password")?.value;

            if (email && password) {
                const { success } = await this.userService.signUp({
                    email,
                    password,
                });
                if (success) response = true;
            }
        }

        if (response) this.router.navigateByUrl("/");
    }
}
