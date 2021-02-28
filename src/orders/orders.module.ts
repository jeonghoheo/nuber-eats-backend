import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant])],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
