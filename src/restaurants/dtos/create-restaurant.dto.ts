import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String)
  readonly name: string;

  @Field((type) => Boolean)
  readonly isVegan: boolean;

  @Field((type) => String)
  readonly address: string;

  @Field((type) => String)
  readonly ownerName: string;
}
