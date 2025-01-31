import { PubSubEngine } from 'graphql-subscriptions';
import { Resolver, Query, Mutation, Arg, Subscription, Root, PubSub, Ctx, Int } from 'type-graphql';
import Actor from '../entities/actor.entity';
import ReqContext from '../interfaces/ReqContext';

@Resolver()
export default class ActorResolver {
    @Query(() => Actor)
    async getActor(
        @Arg('id', () => Int, { nullable: true }) id: number,
        @Ctx() ctx: ReqContext
    ): Promise<Actor> {
    const actor = await ctx.em.findOne(Actor, { id });
    if (!actor) {
        throw new Error('Actor not found');
    }
    return actor;
  }
};