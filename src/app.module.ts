import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: configService.get<string>('GRAPHQL_SCHEMA_FILE'),
        // formatError(error) {
        //   const originalError = error.extensions?.originalError;
        //   if (originalError)
        //     return {
        //       message: originalError['message'],
        //       code: originalError['error'],
        //       status: originalError['statusCode'],
        //     };
        //   return {
        //     message: error.message,
        //     code: error.extensions?.status || 400,
        //     status:
        //       error.extensions?.code !== 'GRAPHQL_VALIDATION_FAILED'
        //         ? error.extensions?.code !== 'INTERNAL_SERVER_ERROR'
        //           ? error.extensions?.code
        //           : 'BAD_REQUEST'
        //         : 'BAD_REQUEST',
        //   };
        // },
      }),
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
