import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';

@Resolver()
export class RestaurantResolver {
  @Query(() => Restaurant) // Graphql을 위한것 따라서 Type양식은 Graphql의것을 따라간다
  myRestaurant(): boolean {
    return true;
  }
}
