import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantsDto } from './dtos/create-restaurants.dto';
import { Restaurant } from './entities/restaurants.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantsDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
}
