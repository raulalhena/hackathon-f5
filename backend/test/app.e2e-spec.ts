import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as productsObject from '../src/data/products.json';
import { HttpStatus } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from '../src/products/products.service';
import * as favoritesObject from '../src/data/favorites.json';
import { CreateFavoriteDto } from 'src/favorites/dtos/create.favorite.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map } from 'rxjs';
import { EventEmitterModule } from '@nestjs/event-emitter';

const products = Array.from(productsObject);
const favorites = Array.from(favoritesObject);

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

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, EventEmitter2],
    }).compile();

    app = moduleFixture.createNestApplication();
    productsService = moduleFixture.get(ProductsService);
    eventEmitter = moduleFixture.get(EventEmitter2);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/products GET should return all the products', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(products);
  });

  it('/products/search?filterdBy=name&keyword=Conference&sortedBy should return the filtered products within name "conference"', async () => {
    const response = await request(app.getHttpServer()).get('/products/search?filteredBy=name&keyword=Conference&sortedBy=');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: HttpStatus.OK,
      message: 'Products retrieved succesfully',
      data: [products[1]]
    });
  });

  it('/products/search?filterdBy=description&keyword=description&sortedBy=price should return an array of products filtered by description and sorted by "price"', async () => {
    
    const spy = jest.spyOn(productsService, 'sortProducts');
    spy.mockReturnValue(filterdDescriptionSortedPrice);
    const response = await request(app.getHttpServer()).get('/products/search?filterdBy=description&keyword=description&sortedBy=price');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: HttpStatus.OK,
      message: 'Products retrieved succesfully',
      data: filterdDescriptionSortedPrice
    });
  });

  it('/products POST should add a product', async() => {
    const createProductDto: CreateProductDto = {
      name: 'Patatas monalisa',
      price: 45,
      description: 'Patata con mucho arte',
      image: 'https://github.com/',
      sellerId: '454848',
      category: 'Tuberculos'
    }

    const response = await request(app.getHttpServer()).post('/products').send(createProductDto);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      status: HttpStatus.OK,
      message: 'Se ha creado el anuncio con éxito',
      data: newProduct
    });
  });

  it('products/1 GET should return the product with id=1', async () => {
    const id = '1';

    const response = await request(app.getHttpServer()).get('/products/' + id);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(products[0]);
  });

  it('/favorites/:id GET should return all the favorites categories of the user', async () => {
    const id = '1';
    const response = await request(app.getHttpServer()).get('/favorites/' + id);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: HttpStatus.OK,
      message: 'All favorites retrieved successfully',
      data: favorites[0].categories
    });
  });

  it('/favorites/categories PATCH should update the favorite categories list of the user', async () => {
    const createFavoriteDto: CreateFavoriteDto = {
        userId: '1',
        type: 'categories',
        name: 'Frutos secos'
    }

    const response = await request(app.getHttpServer()).patch('/favorites/categories').send(createFavoriteDto);
    expect(response.statusCode).toBe(200);
    // expect(response.body).toMatchObject({
    //   status: HttpStatus.OK,
    //   message: '',
    //   data: ''
    // });
  });

  it('/favorites/categories PATCH should update the favorite categories list of the user', async () => {
    const createFavoriteDto: CreateFavoriteDto = {
        userId: '1',
        type: 'categories',
        name: 'Frutos secos'
    }

    const obs = fromEvent(eventEmitter, `created.Frutos secos`).pipe(map((_) => ({ data: `Nuevo producto en la categoría Frutos secos` })));

    const response = await request(app.getHttpServer()).patch('/favorites/categories').send(createFavoriteDto);
    expect(response.statusCode).toBe(200);
    // expect(response.body).toMatchObject(obs);
  });

});
