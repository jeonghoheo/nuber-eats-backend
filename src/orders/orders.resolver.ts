import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderIntput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}
  @Mutation((type) => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input') createOrderInput: CreateOrderIntput,
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(customer, createOrderInput);
  }
}
