"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products = require("../data/products.json");
let ProductsService = exports.ProductsService = class ProductsService {
    create(createProductDto) {
        return createProductDto;
    }
    findAll() {
        return products;
    }
    sortProducts(array, sortedBy) {
        const sorting = {
            createdAt() {
                return array.sort((a, b) => {
                    const ad = new Date(a.createdAt);
                    const bd = new Date(b.createdAt);
                    return ad - bd;
                });
            },
            price() {
                return array.sort((a, b) => a.price - b.price);
            }
        };
        return sorting[sortedBy]();
    }
    search(filteredBy, keyword, sortedBy) {
        try {
            const regex = RegExp(keyword, 'i');
            let filteredProducts = products;
            if (filteredBy) {
                const filters = filteredBy.split(',');
                filters.forEach(filter => {
                    filteredProducts = products.filter(product => product[filter].match(regex));
                });
            }
            if (sortedBy)
                filteredProducts = this.sortProducts(filteredProducts, sortedBy);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Products retrieved succesfully',
                data: filteredProducts
            };
        }
        catch (e) {
            throw new Error('Error ocurred while searching');
        }
    }
    findOne(id) {
        return products.filter(product => product._id === id);
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map