import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ActorService } from '../actor.service';
import CreateActorInput from '../type/create-actor-input.type';
import ActorObjectType from '../type/actor-object.type';
import UpdateActorInput from '../type/update-actor-input.type';

@Resolver(ActorObjectType)
export class ActorResolver {
  actorService: ActorService;

  constructor() {
    this.actorService = new ActorService();
  }

  /* This is a query that takes in no arguments and returns an array of ActorObjectType. */
  @Query((returns) => [ActorObjectType])
  async getActors() {
    return await this.actorService.find();
  }

  /* This is a query that takes in an argument of type string and returns an ActorObjectType. */
  @Query((returns) => ActorObjectType)
  async findActor(@Arg('id') id: string) {
    return await this.actorService.findOne(id);
  }

  /* This is a mutation that takes in an argument of type CreateActorInput and returns an
ActorObjectType. */
  @Mutation((returns) => ActorObjectType)
  async addActor(@Arg('params') params: CreateActorInput) {
    return await this.actorService.add(params);
  }

  /* A mutation that takes in an argument of type string and UpdateActorInput and returns an
  ActorObjectType. */
  @Mutation((returns) => ActorObjectType)
  async updateActor(
    @Arg('id') id: string,
    @Arg('params') params: UpdateActorInput,
  ) {
    return await this.actorService.update(id, params);
  }

  /* A mutation that takes in an argument of type string and returns an ActorObjectType. */
  @Mutation((returns) => Boolean)
  async deleteActor(@Arg('id') id: string) {
    return await this.actorService.delete(id);
  }
}
