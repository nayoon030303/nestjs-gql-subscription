import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AppService } from './app.service';
import { MessageType } from './property.object.type';

@Resolver('App')
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  pubSub = new PubSub();
  @Query(() => MessageType)
  async getMessage() {
    return await this.appService.getMessage();
  }

  @Mutation(() => MessageType)
  async setMessage(
    @Args('msg', { type: () => String, nullable: false }) msg?: string,
  ) {
    const newMessage = await this.appService.setMessage(msg);
    this.pubSub.publish('messageChanged', { messageChanged: newMessage });
    return newMessage;
  }

  @Subscription(() => MessageType, {
    filter: (payload, variables) => payload.messageChanged.id === variables.id,
  })
  messageChanged(
    @Args('id', { type: () => Number, nullable: false }) id?: number,
  ) {
    return this.pubSub.asyncIterator('messageChanged');
  }
}
