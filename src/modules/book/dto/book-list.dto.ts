import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from '../entities/book.entity';
import { BookListResponse } from '../../../proto/book';

@ObjectType('listBook')
export class ListBook implements BookListResponse {
  @Field(() => [Book])
  bookList: Book[];
}
