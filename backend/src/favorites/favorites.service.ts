import { Injectable } from '@nestjs/common';
import * as favoritesObj from '../data/favorites.json';
import { CreateFavoriteDto } from './dtos/create.favorite.dto';

const favorites = Array.from(favoritesObj);

@Injectable()
export class FavoritesService {

    add(createFavoriteDto: CreateFavoriteDto) {
        favorites.forEach(favorite => {
            if(favorite.userId === createFavoriteDto.userId){
                if(!favorite.categories.includes(createFavoriteDto.name.toLowerCase())){
                    favorite[createFavoriteDto.type].push(createFavoriteDto.name.toLowerCase());
                    return;
                }
            }
        });
    }

    findAll() {
        return favorites;
    }

}
