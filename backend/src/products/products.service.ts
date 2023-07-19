import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as products from "../data/products.json";

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return createProductDto;
  }

  findAll() {
    return products;
  }

  sortArray(array, sorted) {
    const sorting = {
      createdAt() {
        return array.sort((a, b) => {
          const ad: any = new Date(a.createdAt);
          const bd: any = new Date(b.createdAt);
    
          return ad - bd;
        });
      },
      price() {
        return array.sort((a, b) => a.price - b.price);
      }
    }
    return sorting[sorted]();
  }

  search(filter: string, keyword: string, sorted: string) {
    const regex = RegExp(keyword, 'i');
    let filteredProducts = products.filter(product => product[filter].match(regex) || product.description.match(regex));
    const filters = filter.split(',');
    if(sorted) filteredProducts = this.sortArray(filteredProducts, sorted);
    return filteredProducts;
  }

  findOne(id: string) {
    return products.filter(product => product._id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
