import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { IValueItem } from '../../interfaces/value-item.interface';

@Component({
    selector: 'app-create-product',
    standalone: true,
    imports: [
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './create-product.component.html',
    styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {
    public groupDescriptions!: any;
    public groupFeatures!: any;
    public groupImages!: any;
    public productForm!: FormGroup;
    public brandList: IValueItem[] = [];
    public ramList: IValueItem[] = [];
    public diskTypeList: IValueItem[] = [];
    public diskSizeList: IValueItem[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private router: Router,
    ) {
        this.productForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            price: ['', [Validators.required, Validators.min(100000)]],
            brand_id: ['', [Validators.required]],
            hard_drive_type_id: ['', [Validators.required]],
            hard_drive_size_id: ['', [Validators.required]],
            ram_id: ['', [Validators.required]],
            images: new FormArray([new FormGroup({
                image_path: new FormControl('', Validators.required),
            })]),
            additional_info: new FormGroup({
                title: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required),
                image_path: new FormControl('', Validators.required),
                features: new FormArray([new FormGroup({
                    name: new FormControl('', Validators.required),
                })]),
            }),
            specifications: new FormArray([new FormGroup({
                name: new FormControl('', Validators.required),
                value: new FormControl('', Validators.required),
            })]),
        });

        this.groupImages = new FormArray([]);
        this.groupImages = this.productForm.get('images') as FormArray;
        this.groupFeatures = new FormArray([]);
        this.groupFeatures = this.productForm.get('additional_info.features') as FormArray;
        this.groupDescriptions = new FormArray([]);
        this.groupDescriptions = this.productForm.get('specifications') as FormArray;
    }

    async ngOnInit() {
        await this.getBrands();
        await this.getRams();
        await this.getTypesDisk();
        await this.getSizeDisk();
    }

    async getBrands() {
        // Obtenemos Marcas
        const { data } = await this.productService.getBrands();
        data.forEach((brand: IValueItem) => {
            this.brandList.push({
                id: brand.id,
                name: brand.name,
                checked: false,
            });
        });
    }

    async getRams() {
        // Obtenemos Rams
        const { data } = await this.productService.getRams();
        data.forEach((ram: IValueItem) => {
            this.ramList.push({
                id: ram.id,
                name: `${ram.name}GB`,
                checked: false,
            });
        });
    }

    async getTypesDisk() {
        // Obtenemos Tipos de discos
        const { data } = await this.productService.getTypesDisk();
        data.forEach((type: IValueItem) => {
            this.diskTypeList.push({
                id: type.id,
                name: type.name,
                checked: false,
            });
        });
    }

    async getSizeDisk() {
        // Obtenemos Tipos de discos
        const { data } = await this.productService.getSizesDisk();
        data.forEach((size: IValueItem) => {
            this.diskSizeList.push({
                id: size.id,
                name: `${size.name}GB`,
                checked: false,
            });
        });
    }

    async addImage() {
        const group = new FormGroup({
            image_path: new FormControl('', Validators.required),
        });

        this.groupImages.push(group);
    }

    async removeImage(index: number) {
        this.groupImages.removeAt(index);
    }

    async addFeatures() {
        const group = new FormGroup({
            name: new FormControl('', Validators.required),
        });

        this.groupFeatures.push(group);
    }

    async removeFeatures(index: number) {
        this.groupFeatures.removeAt(index);
    }

    async addSpecification() {
        const group = new FormGroup({
            name: new FormControl('', Validators.required),
            value: new FormControl('', Validators.required),
        });

        this.groupDescriptions.push(group);
    }

    async removeSpecification(index: number) {
        this.groupDescriptions.removeAt(index);
    }

    async onSubmit() {
        if (this.productForm.valid) {
            this.productService.createProduct(this.productForm.value).subscribe({
                next: (response) => {
                    console.log('Producto creado con éxito', response);
                    this.router.navigateByUrl("/");
                },
                error: (error) => {
                    console.error('Ocurrió un error al crear el producto', error);
                    alert("Ocurrió un error al crear el producto. Inténtalo de nuevo");
                }
            });
        } else {
            console.log('El formulario no es válido');
            alert("Por favor revisa el formulario");
        }
    }
}
