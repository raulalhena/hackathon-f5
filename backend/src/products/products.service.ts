import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as productsObj from "../data/products.json";
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ProductCreatedEvent } from '../events/created.product.event';
import { EventsService } from 'src/modelevents/events.service';

const products = Array.from(productsObj);

@Injectable()
export class ProductsService {

  constructor(private readonly eventEmitter: EventEmitter2,
    private readonly eventsService: EventsService
    ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      _id: String(+products.at(-1)._id + 1),
      ...createProductDto,
      createdAt: new Date().toLocaleDateString('sv'),
      updatedAt: new Date().toLocaleDateString('sv')
    }
    products.push(newProduct);
    this.eventEmitter.emit(`created.${createProductDto.category}`);
    return {
      status: HttpStatus.OK,
      message: 'Se ha creado el anuncio con éxito',
      data: newProduct
    };
  }

  findAll() {
    return products;
  }

  sortProducts(products, sortedBy) {
    const sorting = {
      createdAt() {
        return products.sort((a, b) => {
          const ad: any = new Date(a.createdAt);
          const bd: any = new Date(b.createdAt);

          return ad - bd;
        });
      },
      price() {
        return products.sort((a, b) => a.price - b.price);
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
