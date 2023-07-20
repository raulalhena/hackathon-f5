import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): CreateProductDto;
    findAll(): {
        _id: string;
        name: string;
        price: number;
        description: string;
        image: string;
        sellerId: string;
        category: string;
        createdAt: string;
        updatedAt: string;
    }[];
    search(filteredBy: string, keyword: string, sortedBy: string): {
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            _id: string;
            name: string;
            price: number;
            description: string;
            image: string;
            sellerId: string;
            category: string;
            createdAt: string;
            updatedAt: string;
        }[];
    };
    findOne(id: string): {
        _id: string;
        name: string;
        price: number;
        description: string;
        image: string;
        sellerId: string;
        category: string;
        createdAt: string;
        updatedAt: string;
    }[];
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
