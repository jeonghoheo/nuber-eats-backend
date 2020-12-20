import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateRestaurantsDto {
  @Field(() => String)
  name: string;
  @Field(() => Boolean)
  isVegan: boolean;
  @Field(() => String)
  adress: string;
  @Field(() => String)
  ownersName: string;
}
