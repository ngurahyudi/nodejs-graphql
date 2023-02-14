import { CreateMovieDto, UpdateMovieDto } from './dto';
import Movie from './entity/movie.entity';

export class MovieService {
  /**
   * It returns all the movies in the database
   * @returns An array of all the movies in the database.
   */
  async find() {
    try {
      return await Movie.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find an movie by id.
   * @param {string} id - string - the id of the movie we want to find
   * @returns An movie with the given id.
   */
  async findOne(id: string) {
    try {
      const movie = await Movie.findOne({ where: { id } });

      if (!movie) throw 'data not found';

      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It takes in a CreateMovieDto object, creates a new Movie object, and returns it
   * @param {CreateMovieDto} params - CreateMovieDto
   * @returns The movie that was created
   */
  async add(params: CreateMovieDto) {
    try {
      return await Movie.create({ ...params });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It updates the movie with the given id with the given params
   * @param {string} id - The id of the movie to be edited
   * @param {UpdateMovieDto} params - UpdateMovieDto
   * @returns The number of rows affected by the update.
   */
  async update(id: string, params: UpdateMovieDto) {
    try {
      const result = await Movie.update({ ...params }, { where: { id } });

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
   * It deletes an movie from the database
   * @param {string} id - string - The id of the movie to delete.
   * @returns The id of the movie that was deleted.
   */
  async delete(id: string) {
    try {
      const result = await Movie.destroy({ where: { id } });

      if (result !== 1) throw 'data not found';

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
