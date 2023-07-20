import { HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
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
    sortProducts(array: any, sortedBy: any): any;
    search(filteredBy: string, keyword: string, sortedBy: string): {
        status: HttpStatus;
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
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
