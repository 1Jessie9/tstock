import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [UserService],
})
export class LoginComponent implements OnInit {
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
    public icons = {
        faSpinner,
    };
    public selectedSegment: number = 1;
    public loginForm: FormGroup;
    public loadInit: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private formBuilder: FormBuilder,
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            name: [''],
            password_confirmation: [''],
        }, { validator: this.matchPasswords('password', 'password_confirmation') });
    }

    ngOnInit() {
        this.updateFormValidators();
    }

    async selectSegment(segment: number) {
        this.selectedSegment = segment;
        this.updateFormValidators();
    }

    updateFormValidators() {
        const nameControl = this.loginForm.get('name');
        const passwordConfirmationControl = this.loginForm.get('password_confirmation');

        if (this.selectedSegment === 2) { // Registro
            nameControl?.setValidators([Validators.required, Validators.minLength(3)]);
            passwordConfirmationControl?.setValidators([Validators.required, Validators.minLength(8)]);
        } else { // Inicio de sesión
            nameControl?.clearValidators();
            passwordConfirmationControl?.clearValidators();
        }

        nameControl?.updateValueAndValidity();
        passwordConfirmationControl?.updateValueAndValidity();
    }

    async onSubmit() {
        if (this.loadInit) return;
        let response: boolean = false;
        this.loadInit = true;
        if (this.selectedSegment === 1 && this.loginForm.valid) {
            const email = this.loginForm.get("email")?.value;
            const password = this.loginForm.get("password")?.value;

            if (email && password) {
                const { success, message } = await this.userService.logIn({
                    email,
                    password,
                });
                if (success) response = true;
                else alert(message);
            }
        } else if (this.selectedSegment === 2 && this.loginForm.valid) {
            const email = this.loginForm.get("email")?.value;
            const password = this.loginForm.get("password")?.value;
            const name: string = this.loginForm.get("name")?.value;
            const password_confirmation: string = this.loginForm.get("password_confirmation")?.value;

            if (email && password) {
                const { success, message } = await this.userService.signUp({
                    name,
                    email,
                    password,
                    password_confirmation,
                });
                if (success) response = true;
                else alert(message);
            }
        }

        this.loadInit = false;
        if (response) this.router.navigateByUrl("/");
    }

    matchPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            if (this.selectedSegment === 1) {
                // En el caso de inicio de sesión, no aplicar la validación de coincidencia
                return null;
            }

            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                // Los valores no coinciden, solo aplicar si estamos en el segmento de registro
                return passwordConfirmationInput.setErrors({ notEquivalent: true });
            } else {
                // Los valores coinciden o estamos en inicio de sesión, elimina cualquier error 'notEquivalent' existente
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }
}
