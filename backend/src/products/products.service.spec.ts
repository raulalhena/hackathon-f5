import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateProductDto } from './dto/create-product.dto';
import { HttpStatus } from '@nestjs/common';
import * as products from '../data/products.json';

const filterdDescriptionSortedPrice = [
  {
  "_id": "4",
  "name": "Mermelada de fresa",
  "price": 15,
  "description": "description",
  "image": "url",
  "sellerId": "ObjectId Mongo",
  "category": "Mermeladas",
  "createdAt": "2022-05-20",
  "updatedAt": "2022-05-20"
  },
  {
  "_id": "2",
  "name": "Pera conference",
  "price": 35,
  "description": "description",
  "image": "url",
  "sellerId": "ObjectId Mongo",
  "category": "Fruta",
  "createdAt": "2022-05-25",
  "updatedAt": "2022-05-25"
  },
  {
  "_id": "1",
  "name": "Tomate de Barbastro",
  "price": 45,
  "description": "description",
  "image": "url",
  "sellerId": "ObjectId Mongo",
  "category": "Hortalizas",
  "createdAt": "2023-05-25",
  "updatedAt": "2023-05-25"
  },
  {
  "_id": "5",
  "name": "Manchego de Barbastro",
  "price": 55,
  "description": "description",
  "image": "url",
  "sellerId": "ObjectId Mongo",
  "category": "Quesos",
  "createdAt": "2022-06-20",
  "updatedAt": "2022-06-20"
  }
];

const newProduct = {
  _id: String(+products.at(-1)._id + 1),
  name: 'Patatas monalisa',
  price: 45,
  description: 'Patata con mucho arte',
  image: 'https://github.com/',
  sellerId: '454848',
  category: 'Tuberculos',
  createdAt: new Date().toLocaleDateString('sv'),
  updatedAt: new Date().toLocaleDateString('sv')
}

describe('ProductsService', () => {
  let service: ProductsService;

  const mockEventEmitter = {
    emit: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, 
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter
      }
    ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll() should return all the db objects', async () => {
    expect(await service.findAll()).toMatchObject(products);
  });

  it('create() should return standar object', async() => {
    const createProductDto: CreateProductDto = {
      name: 'Patatas monalisa',
      price: 45,
      description: 'Patata con mucho arte',
      image: 'https://github.com/',
      sellerId: '454848',
      category: 'Tuberculos'
    }

    expect(await service.create(createProductDto)).toMatchObject({
        status: HttpStatus.OK,
        message: 'Se ha creado el anuncio con éxito',
        data: newProduct
    });
  });

  it('search() should return the products filtered', async () => {
    const filteredBy = 'name';
    const keyword = 'Conference';
    const sortedBy = '';

    expect(await service.search(filteredBy, keyword, sortedBy)).toMatchObject({
      status: HttpStatus.OK,
      message: 'Products retrieved succesfully',
      data: [products[1]]
    });
  });

  it('search() should return the products filtered and sorted', async () => {
    const filteredBy = 'description';
    const keyword = 'description';
    const sortedBy = 'price';

    expect(await service.search(filteredBy, keyword, sortedBy)).toMatchObject({
      status: HttpStatus.OK,
      message: 'Products retrieved succesfully',
      data: filterdDescriptionSortedPrice
    });
  });

  it('findOne() should return the product that matchs with the id provided', async() => {
    const id = '2';
    expect(await service.findOne(id)).toMatchObject(products[1]);
  });
});
