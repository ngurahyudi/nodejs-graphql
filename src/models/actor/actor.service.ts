import Actor from './entity/actor.entity';
import Movie from '../movie/entity/movie.entity';
import { CreateActorDto, UpdateActorDto } from './dto';

export class ActorService {
  /**
   * It returns all the actors in the database
   * @returns An array of all the actors in the database.
   */
  async find() {
    try {
      return await Actor.findAll({ include: [Movie] });
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
      const actor = await Actor.findOne({ where: { id }, include: [Movie] });

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
      return await Actor.create({ ...params }, { include: [Movie] });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It updates the actor's data based on the id and the params passed to the function
   * @param {string} id - string - The id of the actor to update
   * @param {UpdateActorDto} params - UpdateActorDto
   * @returns The result of the update query.
   */
  async update(id: string, params: UpdateActorDto) {
    try {
      const result = await Actor.update({ ...params }, { where: { id } });

      if (result[0] === 0) throw 'data not found';

      return true;
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
