import { HttpStatus, Injectable } from '@nestjs/common';
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

  sortProducts(array, sortedBy) {
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
    return sorting[sortedBy]();
  }

  search(filteredBy: string, keyword: string, sortedBy: string) {
    try{
      const regex = RegExp(keyword, 'i');
      let filteredProducts = products;

      if(filteredBy){
        const filters = filteredBy.split(',');
        filters.forEach(filter => {
          filteredProducts = products.filter(product => product[filter].match(regex));
        }); 
      }
      
      if(sortedBy) filteredProducts = this.sortProducts(filteredProducts, sortedBy);
      return {
        status: HttpStatus.OK,
        message: 'Products retrieved succesfully',
        data: filteredProducts
      } 
    }catch(e) {
      throw new Error('Error ocurred while searching')
    }
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
