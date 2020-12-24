import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantsDto } from './dtos/create-restaurants.dto';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantsService) {}
  @Query(() => [Restaurant]) // Graphql을 위한것 따라서 Type양식은 Graphql의것을 따라간다
  Restaurant(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation(() => Boolean)
  async create(
    @Args('input') createRestaurantsDto: CreateRestaurantsDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantsDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
