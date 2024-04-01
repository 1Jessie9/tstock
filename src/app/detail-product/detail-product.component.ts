import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ICardProduct } from '../../interfaces/card-product.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faStar, faChevronLeft, faChevronRight, faUserPlus, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { IComment } from '../../interfaces/comment.interface';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
register();

@Component({
    selector: 'app-detail-product',
    standalone: true,
    imports: [
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './detail-product.component.html',
    styleUrl: './detail-product.component.scss',
    animations: [
        trigger('sendIcon', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(.1)' }),
                animate('200ms', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
            transition(':leave', [
                animate('200ms', style({ opacity: 0, transform: 'scale(.1)' })),
            ]),
        ]),
    ],
})
export class DetailProductComponent implements AfterViewInit, OnInit {
    public swiper!: Swiper;
    public infoProduct!: ICardProduct;
    public scoreProduct: number[] = [];
    public faStar = faStar;
    public faCartShopping = faCartShopping;
    public faChevronLeft = faChevronLeft;
    public faChevronRight = faChevronRight;
    public faUserPlus = faUserPlus;
    public faPaperPlane = faPaperPlane;
    public faTrash = faTrash;
    public titleEdit: string = "";
    public imgSeleted: string = "";
    public selectedSegment: number = 1;
    public listSegment = [
        {
            id: 1,
            name: "Características",
        },
        {
            id: 2,
            name: "Especificaciones",
        },
        {
            id: 3,
            name: "Comentarios",
        },
    ];
    public valueComment: string = "";
    public comments: IComment[] = [
        {
            id: 1,
            name: "Yessica C.",
            score: 4.9,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            createdAt: "19 Mar, 2023"
        },
        {
            id: 2,
            name: "Santiago C.",
            score: 4.5,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            createdAt: "30 Dic, 2023"
        },
        {
            id: 1,
            name: "Rous N.",
            score: 5.0,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            createdAt: "24 ene, 2024"
        }
    ];
    public hasSuperAdminRole: boolean = false;

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        public userService: UserService,
    ) {
    }

    async ngOnInit() {
        await this.activatedRoute.params.subscribe(async (params: Params) => {
            const productId = params['id'];
            const product = await this.productService.getProductById(productId);
            console.log(this.infoProduct);
            this.infoProduct = product;
            this.infoProduct.featureInfo = {
                imgSrc: product.additional_info[0].image_path,
                title: product.additional_info[0].title,
                description: product.additional_info[0].description,
                features: JSON.parse(product.additional_info[0].features),
            }
            this.infoProduct.specifications = JSON.parse(product.specifications);
            this.infoProduct.totalScores = 19;
            this.infoProduct.score = 5;
            this.scoreProduct = [...Array(this.infoProduct.score).keys()];
            this.imgSeleted = this.infoProduct.gallery[0]?.image_path;
            this.titleEdit = this.infoProduct.title;
        });

        this.userService.checkSuperAdminPermission().subscribe({
            next: (response) => {
                this.hasSuperAdminRole = response.hasSuperAdminRole;
            },
            error: (error) => {
                console.error('Error fetching superAdmin permission', error);
            }
        });
    }

    ngAfterViewInit() {
        this.swiper = new Swiper('.swiper', {
            // Parámetros de Swiper
            spaceBetween: 30,
            slidesPerView: 'auto',
        });
    }

    async addShoppingCar() {
        // TODO agregar servicio para agregar al carrito
        console.log("agregar carttio")
    }

    async changeImage(image: string) {
        this.imgSeleted = image;
    }

    async moveSwiper(move: 'right' | 'left') {
        if (move === 'left') this.swiper.slidePrev();
        if (move === 'right') this.swiper.slideNext();
    }

    async selectSegment(segment: number) {
        this.selectedSegment = segment;
    }

    async removeGallery(imageId: number) {
        const result = await this.productService.removeGalleryById(imageId);

        if (result) {
            const index = this.infoProduct.gallery.findIndex(item => item.id === imageId);
            if (index != -1) this.infoProduct.gallery.splice(index, 1);
        }
    }

    async changeTitle() {
        const result = await this.productService.updateTitle(this.infoProduct.id, this.titleEdit);

        if (result && result.title) {
            this.titleEdit = result.title;
            this.infoProduct.title = result.title;
        }
    }
}
