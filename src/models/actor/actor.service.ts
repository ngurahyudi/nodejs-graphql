import { CreateActorDto, UpdateActorDto } from './dto';
import Actor from './entity/actor.entity';

export class ActorService {
  /**
   * It returns all the actors in the database
   * @returns An array of all the actors in the database.
   */
  async find() {
    try {
      return await Actor.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find an actor by id.
   * @param {string} id - string - the id of the actor we want to find
   * @returns An actor with the given id.
   */
  async findOne(id: string) {
    try {
      const actor = await Actor.findOne({ where: { id } });

      if (!actor) throw 'data not found';

      return actor;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It takes in a CreateActorDto object, creates a new Actor object, and returns it
   * @param {CreateActorDto} params - CreateActorDto
   * @returns The actor that was created
   */
  async add(params: CreateActorDto) {
    try {
      return await Actor.create({ ...params });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It updates the actor with the given id with the given params
   * @param {string} id - The id of the actor to be edited
   * @param {UpdateActorDto} params - EditActorDto
   * @returns The number of rows affected by the update.
   */
  async update(id: string, params: UpdateActorDto) {
    try {
      const result = await Actor.update({ ...params }, { where: { id } });

      if (result[0] === 0) throw 'data not found';

      return {
        id,
        ...params,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It deletes an actor from the database
   * @param {string} id - string - The id of the actor to delete.
   * @returns The id of the actor that was deleted.
   */
  async delete(id: string) {
    try {
      const result = await Actor.destroy({ where: { id } });

      if (result !== 1) throw 'data not found';

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
