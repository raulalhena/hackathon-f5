import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import * as products from '../data/products.json';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductsService = {
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    sortArrayByDate: jest.fn().mockImplementation((array) => {
      return array.sort((a, b) => {
        const ad: any = new Date(a.createdAt);
        const bd: any = new Date(b.createdAt);
  
        return ad - bd;
      });
    }),
    search: jest.fn().mockImplementation((filter: string, keyword: string) => {
      const regex = RegExp(keyword, 'i');
      let filteredProducts = products.filter(product => product.name.match(regex) || product.description.match(regex));
      const filters = filter.split(',');
      if(filters.includes('createdAt')) filteredProducts = mockProductsService.sortArrayByDate(filteredProducts);
      return filteredProducts;
    })
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

  // Test de la función findAll(), devuelve todos los objetos de la base de datos
  it('findAll() should return all the products', async () => {
    expect(await controller.findAll()).toMatchObject(products);
  });

  it('search() should return the products filtered', async () => {
    const filter = 'createdAt';

    expect(await controller.search(filter, keyword)).toMatchObject(products[1]);
  });

  xit('search() should return the products filtered and sorted', async () => {
    const filter = 'createdAt';
    const keyword = 'Rosa';

    expect(await controller.search(filter, keyword)).toMatchObject(products[1]);
  });
});
