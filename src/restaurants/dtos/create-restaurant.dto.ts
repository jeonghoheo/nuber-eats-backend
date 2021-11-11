import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  readonly name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  readonly isVegan: boolean;

  @Field((type) => String)
  @IsString()
  readonly address: string;

  @Field((type) => String)
  @IsString()
  readonly ownerName: string;
}
