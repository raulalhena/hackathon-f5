import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import * as products from '../data/products.json';
import { HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

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

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductsService = {
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    sortProducts: jest.fn().mockImplementation((products, sortedBy: string) => {
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
    }),
    search: jest.fn().mockImplementation((filteredBy: string, keyword: string, sortedBy: string) => {
        const regex = RegExp(keyword, 'i');
        let filteredProducts = products;
  
        if(filteredBy){
          const filters = filteredBy.split(',');
          filters.forEach(filter => {
            filteredProducts = products.filter(product => product[filter].match(regex));
          }); 
        }
        
        if(sortedBy) filteredProducts = mockProductsService.sortProducts(filteredProducts, sortedBy);
        
        return {
          status: HttpStatus.OK,
          message: 'Products retrieved succesfully',
          data: filteredProducts
        } 
    }),
    create: jest.fn().mockImplementation((createProductDto: CreateProductDto) => {
      return Promise.resolve({
          status: HttpStatus.OK,
          message: 'Se ha creado el anuncio con éxito',
          data: {
            _id: String(+products.at(-1)._id + 1),
            ...createProductDto,
            createdAt: new Date().toLocaleDateString('sv'),
            updatedAt: new Date().toLocaleDateString('sv')
          }
      }
    )})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
    .overrideProvider(ProductsService)
    .useValue(mockProductsService)
    .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll() should return all the products', async () => {
    expect(await controller.findAll()).toMatchObject(products);
  });

  it('search() should return the products filtered', async () => {
    const filteredBy = 'name';
    const keyword = 'Conference';
    const sortedBy = '';

    expect(await controller.search(filteredBy, keyword, sortedBy)).toMatchObject({
      status: HttpStatus.OK,
      message: 'Products retrieved succesfully',
      data: [products[1]]
    });
  });

  it('search() should return the products filtered and sorted', async () => {
    const filteredBy = 'description';
    const keyword = 'description';
    const sortedBy = 'price';

    expect(await controller.search(filteredBy, keyword, sortedBy)).toMatchObject({
      status: HttpStatus.OK,
      message: 'Products retrieved succesfully',
      data: filterdDescriptionSortedPrice
    });
  });

  it('create() should return a standard object with the created product', async() => {
    const createProductDto: CreateProductDto = {
      name: 'Patatas monalisa',
      price: 45,
      description: 'Patata con mucho arte',
      image: 'https://github.com/',
      sellerId: '454848',
      category: 'Tuberculos'
    }

    expect(await controller.create(createProductDto)).toMatchObject({
        status: HttpStatus.OK,
        message: 'Se ha creado el anuncio con éxito',
        data: newProduct
    });
  })
});
