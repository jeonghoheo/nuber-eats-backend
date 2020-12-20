import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantsDto } from './dtos/create-restaurants.dto';
import { Restaurant } from './entities/restaurants.entity';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant]) // Graphql을 위한것 따라서 Type양식은 Graphql의것을 따라간다
  Restaurant(@Args('valueOnly') valueOnly: boolean): Restaurant[] {
    return [];
  }

  @Mutation(() => Boolean)
  create(@Args() createRestaurantsDto: CreateRestaurantsDto): boolean {
    return true;
  }
}
