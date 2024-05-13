import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from '../../proto/book';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookDto') createBookDto: CreateBookDto) {
    console.log('first');
    return this.bookService.create(createBookDto);
  }

  @Query(() => [Book], { name: 'getAllBook' })
  findAll() {
    return this.bookService.findAll();
  }

  @Query(() => Book, { name: 'getBookById' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findBookById({ id });
  }

  // @Mutation(() => Book)
  // updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
  //   return this.bookService.update(updateBookInput.id, updateBookInput);
  // }

  // @Mutation(() => Book)
  // removeBook(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookService.remove(id);
  // }
}
