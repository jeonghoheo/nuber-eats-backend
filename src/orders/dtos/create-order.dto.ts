import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsInt, IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';
import { Order } from '../entities/order.entity';

@InputType()
class CreateOrderItemInput {
  @Field((type) => Int)
  @IsInt()
  dishId: number;

  @Field((type) => DishOption, { nullable: true })
  options?: DishOption;
}

@InputType()
export class CreateOrderIntput {
  @Field((type) => Int)
  @IsNumber()
  restaurantId: number;

  @Field((type) => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
