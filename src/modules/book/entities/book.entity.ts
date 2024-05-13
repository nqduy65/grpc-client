import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Book')
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  bookName: string;

  @Field()
  publishBy: string;

  @Field(() => Int)
  publishYear: number;

  @Field()
  author: string;
}
