import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BOOK_PACKAGE_NAME } from '../../proto/book';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [BookResolver, BookService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: BOOK_PACKAGE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: BOOK_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../src/proto/book.proto'),
            url: configService.get<string>('BOOK_SERVICE_URL'),
          },
        }),
      },
    ]),
  ],
})
export class BookModule {}
