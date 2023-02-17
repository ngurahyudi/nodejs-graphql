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
  
- Sequelize CLI database configurations :
  
  Rename database-copy.json to **database.json** (located in **db/**) and fill with your environment variables
 
 ```bash
 # Install dependency
 $ yarn install
 
 # Running Migration and Seeders
 # * migrations
 $ yarn sequelize db:migrate --env <your_desired_environment_name>
 
 # * seeders
 $ yarn sequelize db:seed:all --env <your_desired_environment_name>
 
 # <your_desired_environment_name> ex: development / test / production
 
 # Start app hot reload mode
 $ yarn start:dev
 
 # Testing
 $ yarn test
 
 # More script, see package.json
 
 ```
 
 
