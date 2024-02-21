import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown, faCheck, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IValueItem } from '../../interfaces/value-item.interface';
import { ICardProduct } from '../../interfaces/card-product.interface';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductService } from '../../services/product.service';
import { IParamsProduct } from '../../interfaces/params-product.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-list-products',
    standalone: true,
    imports: [
        FontAwesomeModule,
        CardProductComponent,
        ReactiveFormsModule,
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
export class ListProductsComponent implements OnInit {
    public icons = {
        faSearch,
        faChevronDown,
        faCheck,
        faSpinner,
        faXmark,
    };
    public totalProducts: number = 0;
    public accordionOpened: number = 0;
    public orderOpened: boolean = false;
    public orderList: IValueItem[] = [
        { id: 1, name: "Relevancia", checked: false, value: "relevance" },
        { id: 2, name: "Menor precio", checked: false, value: "lowerPrice" },
        { id: 3, name: "Mayor precio", checked: false, value: "higherPrice" },
        { id: 4, name: "Más vendidos", checked: false, value: "moreSales" },
        { id: 5, name: "De la A - Z", checked: false, value: "AZ" },
        { id: 6, name: "De la Z - A", checked: false, value: "ZA" },
    ];
    public brandList: IValueItem[] = [];
    public ramList: IValueItem[] = [];
    public diskTypeList: IValueItem[] = [];
    public diskSizeList: IValueItem[] = [];
    public brandSelected: number[] = [];
    public ramSelected: number[] = [];
    public diskTypeSelected: number[] = [];
    public diskSizeSelected: number[] = [];
    public orderSelected: IValueItem = this.orderList[0];
    public productsList: ICardProduct[] = [];
    public filtersProduct: IParamsProduct = {
        page: 1,
        orderBy: 'relevance',
    };
    public loadMoreData: boolean = false;
    public noMoreData: boolean = false;
    public searchInput = new FormControl();

    constructor(
        private productService: ProductService,
    ) {
    }

    async ngOnInit() {
        this.productsList = [];
        await this.subscribeSearch();
        await this.getBrands();
        await this.getRams();
        await this.getTypesDisk();
        await this.getSizeDisk();
        await this.getProducts();
    }

    async subscribeSearch() {
        this.searchInput.valueChanges
            .pipe(
                // Espera 500ms después de cada pulsación de tecla
                debounceTime(500),
                // Emitir si el valor actual es diferente al último
                distinctUntilChanged()
            )
            .subscribe(value => {
                this.productsList = [];
                this.filtersProduct.search = value;
                this.noMoreData = false;
                this.getProducts(); // Llama a tu función de búsqueda
            });
    }

    // Escuchar eventos del scroll
    @HostListener('window:scroll', ['$event'])
    async onWindowScroll() {
        // Seguir solo si no esta al final de la página
        if (this.loadMoreData || this.noMoreData) return;

        // posición del scroll
        const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
        // Altura total de la página
        const max = document.documentElement.scrollHeight;

        // Si está casi en el fondo entrar
        if (pos > max - 10) {
            this.loadMoreData = true;
            await this.loadMore();
        }
    }

    async loadMore() {
        // Sumar una página al filtro
        this.filtersProduct.page = (this.filtersProduct.page || 0) + 1;
        // TODO Borrar setTimeout después de carga de datos
        setTimeout(async () => {
            await this.getProducts();
            this.loadMoreData = false;
        }, 300);
        //TODO poner noMoreData en true, solo cuando la data ya este completa
        if (this.productsList.length > 20) this.noMoreData = true;
    }

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

    async getProducts() {
        // Obtenemos productos
        const { data, total } = await this.productService.getProducts(this.filtersProduct);
        data.forEach((product: ICardProduct) => {
            this.productsList.push(product);
        });
        this.totalProducts = total;
    }
}
