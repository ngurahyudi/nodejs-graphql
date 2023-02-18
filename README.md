# nodejs-graphql

- Clone this repository.

```bash
# https :
$ git clone --depth 1 https://github.com/ngurahyudi/nodejs-graphql.git
# or
# ssh :
$ git clone --depth 1 git@github.com:ngurahyudi/nodejs-graphql.git
```

- App configurations :

  Copy and rename .env-copy file into 2 files (located in **src/configs/env/**)

  - **.env.development**
  - **.env.test**

  Fill those 2 .env files with your environment variables

```bash
# Install dependency
$ yarn install

# Running Migration and Seeders
# * migrations
$ NODE_ENV=<your_desired_environment_name> yarn sequelize db:migrate

# * seeders
$ NODE_ENV=<your_desired_environment_name> yarn sequelize db:seed:all

# <your_desired_environment_name> ex: development / test / production

# Start app hot reload mode
$ yarn start:dev

# Testing
$ yarn test

# More script, see package.json

```

Live example:

- https://nodejs-graphql.herokuapp.com/graphiql (with GraphiQL)
- https://nodejs-graphql.herokuapp.com/graphql

signIn mutation
username : admin@test.com
password : Test123@
