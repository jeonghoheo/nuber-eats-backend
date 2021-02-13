import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@ArgsType()
export class CategoryInput {
  @Field((type) => String)
  readonly slug: string;
}

@ObjectType()
export class CategoryOutput extends CoreOutput {
  @Field((type) => Category, { nullable: true })
  readonly category?: Category;
}
