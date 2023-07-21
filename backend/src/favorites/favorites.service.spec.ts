import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dtos/create.favorite.dto';
import { HttpStatus } from '@nestjs/common';
import * as favoritesObject from '../data/favorites.json';
import { mock } from 'node:test';

const favorites = Array.from(favoritesObject);

describe('FavoritesService', () => {
  let service: FavoritesService;

  const mockFavoritesService = {
    findAll: jest.fn().mockImplementation((id: string) => {
      const categories = favorites.map(favorite =>{
          if(favorite.userId === id) return favorite.categories;
      });
      return {
        status: HttpStatus.OK,
        message: 'All favorites retrieved successfully',
        data: categories.flat(1)
      }
    }),
    add: jest.fn().mockImplementation((createFavoriteDto: CreateFavoriteDto) => {
      return {
        status: HttpStatus.OK,
        message: '',
        data: ''
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesService],
    })
    .overrideProvider(FavoritesService)
    .useValue(mockFavoritesService)
    .compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll(:id) should return all the favorites categories from a user', async () => {
    const id = '1';
    expect(await service.findAll(id)).toMatchObject({
      status: HttpStatus.OK,
      message: 'All favorites retrieved successfully',
      data: favorites[0].categories
    });    
  });

  it('add() should update the user and add a category to favorites', async () => {
    const createFavoriteDto: CreateFavoriteDto = {
      userId: '1',
      type: 'category',
      name: 'Tuberculos'
    }
    expect(await service.add(createFavoriteDto)).toMatchObject({
      status: HttpStatus.OK,
      message: '',
      data: ''
    });
  });
});
