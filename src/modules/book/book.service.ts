import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  BOOK_PACKAGE_NAME,
  BOOK_SERVICE_NAME,
  FindBookByIdDto,
  BookServiceClient,
  CreateBookDto,
  FindBookDto,
  UpdateBookDto,
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

  findAll(searchBookDto?: FindBookDto) {
    return lastValueFrom(this.bookService.findAll(searchBookDto));
  }

  update(data: FindBookByIdDto, updateBookInput: UpdateBookDto) {
    return lastValueFrom(this.bookService.update(updateBookInput));
  }

  async remove(data: FindBookByIdDto) {
    try {
      const res = lastValueFrom(this.bookService.remove(data));
      return res;
    } catch (error) {
      console.log('catch');
      console.log(error);
    }
  }
}
