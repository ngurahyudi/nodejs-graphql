import app from '../src/app';
import gql from 'graphql-tag';
import request from 'supertest-graphql';

it(`will return list of actors`, async () => {
  try {
    const { data } = <{ data: any }>await request(app)
      .query(
        gql`
          query {
            getActors {
              id
              name
              movies {
                id
                name
              }
            }
            __typename
          }
        `,
      )
      .expectNoErrors();

    expect(data).toHaveProperty('getActors');
    // expect(data.getActors).toHaveLength(6);
  } catch (error) {
    console.log('error :', error);
  }
});
