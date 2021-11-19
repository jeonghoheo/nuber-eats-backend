import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Column()
  @Field((type) => String)
  readonly name: string;

  @Column()
  @Field((type) => Boolean, { nullable: true })
  readonly isVegan?: boolean;

  @Column()
  @Field((type) => String)
  readonly address: string;

  @Column()
  @Field((type) => String)
  readonly ownerName: string;
}
