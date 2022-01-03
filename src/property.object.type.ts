import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('MessageType')
export class MessageType {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  message: string;
}
