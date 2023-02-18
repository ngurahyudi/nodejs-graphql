import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ActorService } from '../actor.service';
import { CreateActorInput, ActorObjectType, UpdateActorInput } from '../type';

@Resolver(ActorObjectType)
export class ActorResolver {
  actorService: ActorService;

  constructor() {
    this.actorService = new ActorService();
  }

  /* This is a query that takes in no arguments and returns an array of ActorObjectType. */
  @Authorized()
  @Query(() => [ActorObjectType])
  async getActors() {
    return await this.actorService.find();
  }

  /* This is a query that takes in an argument of type string and returns an ActorObjectType. */
  @Authorized()
  @Query(() => ActorObjectType)
  async findActor(@Arg('id') id: string) {
    return await this.actorService.findOne(id);
  }

  /* This is a mutation that takes in an argument of type CreateActorInput and returns an
ActorObjectType. */
  @Authorized()
  @Mutation(() => ActorObjectType)
  async addActor(@Arg('params') params: CreateActorInput) {
    return await this.actorService.add(params);
  }

  /* A mutation that takes in an argument of type string and returns a boolean. */
  @Authorized()
  @Mutation(() => Boolean)
  async updateActor(
    @Arg('id') id: string,
    @Arg('params') params: UpdateActorInput,
  ) {
    return await this.actorService.update(id, params);
  }

  /* A mutation that takes in an argument of type string and returns a boolean. */
  @Authorized()
  @Mutation(() => Boolean)
  async deleteActor(@Arg('id') id: string) {
    return await this.actorService.delete(id);
  }
}
