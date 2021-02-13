import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@InputType()
export class PagenationInput {
  @Field((type) => Number, { defaultValue: 1 })
  page: number;
}

@ObjectType()
export class PagenationOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  totalPage?: number;
}
