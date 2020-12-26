import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantsDto } from './create-restaurants.dto';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantsDto,
) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
