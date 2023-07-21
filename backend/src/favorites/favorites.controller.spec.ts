import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import * as favoritesObject from '../data/favorites.json';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dtos/create.favorite.dto';
import { HttpStatus } from '@nestjs/common';
import { Observable, fromEvent } from 'rxjs';

const favorites = Array.from(favoritesObject);

describe('FavoritesController', () => {
  let controller: FavoritesController;

  const mockEventEmitter2 = {}

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
      return Promise.resolve({
        status: HttpStatus.OK,
        message: '',
        data: ''
      });
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter2
        },
        {
          provide: FavoritesService,
          useValue: mockFavoritesService
        }
    ],
      controllers: [FavoritesController],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll(:id) should return all the favorites categories from a user', async () => {
    const id = '1';
    expect(await controller.findAll(id)).toMatchObject({
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
    expect(await controller.add(createFavoriteDto)).toMatchObject({
      status: HttpStatus.OK,
      message: '',
      data: ''
    });
  });
});
