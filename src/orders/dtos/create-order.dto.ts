import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class CreateOrderIntput extends PickType(Order, ['dishes']) {
  @Field((type) => Int)
  @IsNumber()
  restaurantId: number;
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
