import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PagenationInput,
  PagenationOutput,
} from 'src/common/dtos/pagenation.dto';
import { Category } from '../entities/category.entity';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CategoryInput extends PagenationInput {
  @Field((type) => String)
  readonly slug: string;
}

@ObjectType()
export class CategoryOutput extends PagenationOutput {
  @Field((type) => [Restaurant], { nullable: true })
  readonly restaurants?: Restaurant[];

  @Field((type) => Category, { nullable: true })
  readonly category?: Category;
}
