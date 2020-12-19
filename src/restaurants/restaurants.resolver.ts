import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  @Query(() => Boolean) // Graphql을 위한것 따라서 Type양식은 Graphql의것을 따라간다
  isPizzaGood(): boolean {
    return true;
  }
}
