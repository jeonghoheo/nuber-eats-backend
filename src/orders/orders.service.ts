import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderIntput, CreateOrderOutput } from './dtos/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  async createOrder(
    customer: User,
    { restaurantId, items }: CreateOrderIntput,
  ): Promise<CreateOrderOutput> {
    const restaurant = await this.restaurants.findOne(restaurantId);
    if (!restaurant) {
      return {
        ok: false,
        error: 'Restaurant not found',
      };
    }
  }
}
