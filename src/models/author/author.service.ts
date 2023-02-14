import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import Author from './entity/author.entity';

export class AuthorService {
  /**
   * It returns all the authors in the database
   * @returns An array of all the authors in the database.
   */
  async find() {
    try {
      return await Author.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find an author by id.
   * @param {string} id - string - the id of the author we want to find
   * @returns An author with the given id.
   */
  async findOne(id: string) {
    try {
      const author = await Author.findOne({ where: { id } });

      if (!author) throw 'data not found';

      return author;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It takes in a CreateAuthorDto object, creates a new Author object, and returns it
   * @param {CreateAuthorDto} params - CreateAuthorDto
   * @returns The author that was created
   */
  async add(params: CreateAuthorDto) {
    try {
      return await Author.create({ ...params });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It updates the author with the given id with the given params
   * @param {string} id - The id of the author to be edited
   * @param {UpdateAuthorDto} params - UpdateAuthorDto
   * @returns The number of rows affected by the update.
   */
  async update(id: string, params: UpdateAuthorDto) {
    try {
      const result = await Author.update({ ...params }, { where: { id } });

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
   * It deletes an author from the database
   * @param {string} id - string - The id of the author to delete.
   * @returns The id of the author that was deleted.
   */
  async delete(id: string) {
    try {
      const result = await Author.destroy({ where: { id } });

      if (result !== 1) throw 'data not found';

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
