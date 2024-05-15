import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { SearchBookDto } from './dto/search-book.dto';
import { ListBook } from './dto/book-list.dto';
import { UpdateBookInput } from './dto/update-book.input';
import { UseInterceptors } from '@nestjs/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  @UseInterceptors(GrpcToHttpInterceptor)
  createBook(@Args('createBookDto') createBookDto: CreateBookInput) {
    return this.bookService.create(createBookDto);
  }

  @Query(() => ListBook, { name: 'getAllBook' })
  @UseInterceptors(GrpcToHttpInterceptor)
  async findAll(
    @Args('query', { nullable: true }) searchBookDto: SearchBookDto,
  ) {
    const res = this.bookService.findAll(searchBookDto);
    return res;
  }

  @Query(() => Book, { name: 'getBookById' })
  @UseInterceptors(GrpcToHttpInterceptor)
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findBookById({ id });
  }

  @Mutation(() => Book)
  @UseInterceptors(GrpcToHttpInterceptor)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ) {
    const res = this.bookService.update({ id }, updateBookInput);
    return res;
  }

  @Mutation(() => Book)
  @UseInterceptors(GrpcToHttpInterceptor)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    const res = this.bookService.remove({ id });
    return res;
  }
}
