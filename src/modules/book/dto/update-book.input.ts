import { CreateBookInput } from './create-book.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int)
  id: number;
}
