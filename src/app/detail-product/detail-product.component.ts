import { AfterViewInit, Component } from '@angular/core';
import { ICardProduct } from '../../interfaces/card-product.interface';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faStar, faChevronLeft, faChevronRight, faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { IComment } from '../../interfaces/comment.interface';
register();

@Component({
    selector: 'app-detail-product',
    standalone: true,
    imports: [
        FontAwesomeModule,
        FormsModule,
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
export class DetailProductComponent implements AfterViewInit {
    public swiper!: Swiper;
    public infoProduct: ICardProduct = {
        id: 1,
        name: "Portátil LENOVO4",
        gallerySrc: [
            "https://exitocol.vtexassets.com/arquivos/ids/21481865/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_d.jpg?v=638430217291770000",
            "https://exitocol.vtexassets.com/arquivos/ids/21481862/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_a.jpg?v=638430217287700000",
            "https://exitocol.vtexassets.com/arquivos/ids/21481863/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_b.jpg?v=638430217288930000",
            "https://exitocol.vtexassets.com/arquivos/ids/21481866/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_e.jpg?v=638430217293370000",
            "https://exitocol.vtexassets.com/arquivos/ids/21481865/Computador-Portatil-HP-Pavilion-Intel-Core-i5-1235U-RAM-8-GB-512-GB-SSD-15-eg2519la-3488673_d.jpg?v=638430217291770000",
        ],
        price: 2100000,
        score: 4,
        favorite: false,
        description: "En el portátil LENOVO IdeaPad Slim 3 color Gris, encuentra todo el rendimiento que necesitas, un portátil elegante que cubre tus necesidades, su procesador serie H, Ram y almacenamiento en estado solido, es perfecto para tareas exigentes, con un diseño extraordinario y duradero, este equipo superará tus expectativas. Así mismo, te brindará interacción sorprendente gracias a su pantalla táctil y su conectividad premium. Te sentirás seguro gracias a su obturador de privacidad en su cámara, cuando termines tus reuniones o videollamadas solo tienes que cerrarlo. ¡lleva el tuyo ahora!",
        totalScores: 49,
        featureInfo: {
            imgSrc: "https://www.ktronix.com/medias/1400Wx1400H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-197532261341-010.jpg?context=bWFzdGVyfGltYWdlc3wyNzIyMjB8aW1hZ2UvanBlZ3xhRE5qTDJobFlTOHhOREExTURZMU9ETTROVGsxTUM4eE5EQXdWM2d4TkRBd1NGOXRZWE4wWlhJdmFHOTBabTlzWkdWeUwzUnlZVzV6Wm1WeUwybHVZMjl0YVc1bkwyUmxjRzl6YVhRdmFIbGljbWx6TFdsdWRHVnlabUZqWlhNdlNVNHZiV1ZrYVdFdmNISnZaSFZqZEM4eE9UYzFNekl5TmpFek5ERmZNREV3TG1wd1p3fDEwNWY2MjExYzMxODEyYjU0NzNmOTdlNTcyODFjMWFiNzRmY2RhYTExZGM0YzJmNGE2NjZlOTkwMmUwNWE5Yjc",
            title: "Da un gran paso adelante LENOVO IdeaPad Slim 3",
            description: "Con su asombrosa duración de la batería de hasta 22 horas y su espectacular pantalla Liquid Retina XDR, es un portátil pro sin rival.",
            features: [
                { id: 1, name: "Resolución Full HD, imágenes mas nítidas." },
                { id: 2, name: "Pantalla multi-touch, fácil interacción con tus contenidos" },
                { id: 3, name: "Prueba militar MIL-STD-810H aprobada, mayor durabilidad" },
                { id: 4, name: "TrueBlock privacidad para tu cámara" },
                { id: 5, name: "Lector de huella, acceso fácil y seguro" },
            ]
        },
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
                name: "Procesador",
                value: "Intel Core I5",
            },
            {
                id: 4,
                name: "Sistema Operativo",
                value: "Windows",
            },
            {
                id: 5,
                name: "Modelo del Procesador",
                value: "12450H",
            },
            {
                id: 6,
                name: "Tonalidad de Color",
                value: "Gris",
            },
            {
                id: 7,
                name: "Tamaño Pantalla",
                value: "15.6  Pulgadas",
            },
        ]
    };
    public scoreProduct: number[] = [];
    public faStar = faStar;
    public faCartShopping = faCartShopping;
    public faChevronLeft = faChevronLeft;
    public faChevronRight = faChevronRight;
    public faUserPlus = faUserPlus;
    public faPaperPlane = faPaperPlane;
    public imgSeleted: string = "";
    public selectedSegment: number = 3;
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

    constructor(
        private router: Router,
    ) {
        this.scoreProduct = [...Array(this.infoProduct.score).keys()];
        this.imgSeleted = this.infoProduct.gallerySrc[0];
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
}
