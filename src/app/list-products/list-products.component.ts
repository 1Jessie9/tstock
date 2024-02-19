import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IValueItem } from '../../interfaces/value-item.interface';
import { ICardProduct } from '../../interfaces/card-product.interface';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
    selector: 'app-list-products',
    standalone: true,
    imports: [
        FontAwesomeModule,
        CardProductComponent
    ],
    templateUrl: './list-products.component.html',
    styleUrl: './list-products.component.scss',
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
export class ListProductsComponent {
    public icons = {
        faSearch,
        faChevronDown,
        faCheck,
    }
    public totalProducts: number = 200;
    public accordionOpened: number = 0;
    public orderOpened: boolean = false;
    public orderList: IValueItem[] = [
        { id: 1, name: "Relevancia", checked: false },
        { id: 2, name: "Menor precio", checked: false },
        { id: 3, name: "Mayor precio", checked: false },
        { id: 4, name: "Más vendidos", checked: false },
        { id: 5, name: "De la A - Z", checked: false },
        { id: 6, name: "De la Z - A", checked: false },
    ];
    public brandList: IValueItem[] = [
        { id: 1, name: "Lenovo", checked: false },
        { id: 2, name: "Acer", checked: false },
        { id: 3, name: "HP", checked: false },
        { id: 4, name: "Apple", checked: false },
    ];
    public ramList: IValueItem[] = [
        { id: 1, name: "64GB", checked: false },
        { id: 2, name: "32GB", checked: false },
        { id: 3, name: "16GB", checked: false },
        { id: 4, name: "8GB", checked: false },
        { id: 5, name: "4GB", checked: false },
    ];
    public diskTypeList: IValueItem[] = [
        { id: 1, name: "HDD", checked: false },
        { id: 2, name: "SSD", checked: false },
        { id: 3, name: "HDD + SSD", checked: false },
    ];
    public diskSizeList: IValueItem[] = [
        { id: 1, name: "64GB", checked: false },
        { id: 2, name: "128GB", checked: false },
        { id: 3, name: "256GB", checked: false },
        { id: 4, name: "512GB", checked: false },
        { id: 5, name: "1024GB", checked: false },
    ];
    public brandSelected: number[] = [];
    public ramSelected: number[] = [];
    public diskTypeSelected: number[] = [];
    public diskSizeSelected: number[] = [];
    public orderSelected: IValueItem = this.orderList[0];
    public productsList: ICardProduct[] = [
        {
            id: 1,
            name: "Portátil LENOVO4",
            gallerySrc: [
                "https://exitocol.vtexassets.com/arquivos/ids/21481865/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_d.jpg?v=638430217291770000",
            ],
            price: 2100000,
            score: 4,
            favorite: false,
            description: "",
            totalScores: 10,
            specifications: [
                {
                    id: 1,
                    name: "Procesador",
                    value: "8 GB",
                },
                {
                    id: 2,
                    name: "Disco",
                    value: "SSD 512 GB",
                },
                {
                    id: 3,
                    name: "Memoria RAM",
                    value: "Intel Core I5",
                },
            ],
        },
        {
            id: 2,
            name: "Portátil LENOVO 1",
            gallerySrc: [
                "https://exitocol.vtexassets.com/arquivos/ids/21481865/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_d.jpg?v=638430217291770000",
            ],
            price: 2500000,
            score: 3,
            favorite: false,
            description: "",
            totalScores: 10,
            specifications: [
                {
                    id: 1,
                    name: "Procesador",
                    value: "8 GB",
                },
                {
                    id: 2,
                    name: "Disco",
                    value: "SSD 512 GB",
                },
                {
                    id: 3,
                    name: "Memoria RAM",
                    value: "Intel Core I5",
                },
            ],
        },
        {
            id: 3,
            name: "Portátil LENOVO 2",
            gallerySrc: [
                "https://exitocol.vtexassets.com/arquivos/ids/21481865/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_d.jpg?v=638430217291770000",
            ],
            price: 2500000,
            score: 5,
            favorite: false,
            description: "",
            totalScores: 10,
            specifications: [
                {
                    id: 1,
                    name: "Procesador",
                    value: "8 GB",
                },
                {
                    id: 2,
                    name: "Disco",
                    value: "SSD 512 GB",
                },
                {
                    id: 3,
                    name: "Memoria RAM",
                    value: "Intel Core I5",
                },
            ],
        },
    ]

    async openAccordion(index: number) {
        this.accordionOpened = this.accordionOpened === index ? 0 : index;
    }

    async openAccordionOrder() {
        this.orderOpened = !this.orderOpened;
    }

    async checkedBox(brand: IValueItem, listCheckbox: number[]) {
        brand.checked = !brand.checked;
        if (brand.checked) {
            // Si esta en check agregarlo a la lista para filtrar
            listCheckbox.push(brand.id);
        } else {
            // Sino buscarlo en la lista y borrarlo
            const index = listCheckbox.indexOf(brand.id);
            if (index !== -1) listCheckbox.splice(index, 1);
        }
    }

    async selectOrder(order: IValueItem) {
        this.orderSelected = this.orderSelected === order ? this.orderList[0] : order;
        this.orderOpened = false;
    }
}
