import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  BOOK_PACKAGE_NAME,
  BOOK_SERVICE_NAME,
  FindBookByIdDto,
  BookServiceClient,
  CreateBookDto,
} from '../../proto/book';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookService implements OnModuleInit {
  private bookService: BookServiceClient;

  constructor(@Inject(BOOK_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.bookService =
      this.client.getService<BookServiceClient>(BOOK_SERVICE_NAME);
  }

  findBookById(id: FindBookByIdDto) {
    return lastValueFrom(this.bookService.findOneById(id));
  }

  create(createBookDto: CreateBookDto) {
    return lastValueFrom(this.bookService.create(createBookDto));
  }

  findAll() {
    return `This action returns all book`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} book`;
  // }

  // update(id: number, updateBookInput: UpdateBookInput) {
  //   return `This action updates a #${id} book`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }
}
