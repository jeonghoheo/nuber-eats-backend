import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field((type) => String)
  readonly name: string;

  @Field((type) => Boolean, { nullable: true })
  readonly isVegan?: boolean;

  @Field((type) => String)
  readonly address: string;

  @Field((type) => String)
  readonly ownerName: string;
}
