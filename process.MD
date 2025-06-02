# Summary

I wanted to create a simple MD document that documents the setup steps for this project for similar TS API projects.
This is for a simple college directory API that will provide CRUD functionality and use a MongoDB to store data. We will be using ES6 modules and not CommonJS

## Dependencies

This will be a general list at the start, I may add or remove some as the project gets closer to finishing.

### Production

- express
- mongoose
- dotenv
- cors
- swagger-ui-express

### Dev

- Types for node/express/cors/swagger/eslint
- typescript
- prettier / eslint
- tsx | need this for dev, this replaces nodemon

## Initialize

1. Create new directory and CD into the directory
2. Run command: npm init -y (create package.json)

   - Change "type" to "module"

3. Create scripts:
   - "dev": "tsx watch src/server.ts"
   - "build": "tsc"
   - "start": "node dist/server.js"
4. Create basic file structure - using the same structure for last node API, but also adding a src directory

   - Directory: src
     - Directory: routes
     - Directory: controllers
     - Directory: types
     - Directory: db
       - Directory: models
   - Directory: dist

5. ## Files
6. Run command: npx tsc --init | This creates a generic tsconfig that has most commented out

   - Need to make sure we have outDir set to dist (where compiled code will go)
   - Need to make sure we have rootDir set to src (where source code lives)
   - Change "module" from "commonJS" to "es2020"
   - Change "target" to "es2020"
   - moduleResolution = node
   - rewriteRelativeImportExtensions: true - We need imports to be in .js, and we need TS to not remove the extension
   - resolveJsonModule: true

7. Connect MongoDb

   - Create a db/connect.ts file
   - Create init function using Mongoose, export it and call it in server.ts later

8. Create src/server.js

   - make sure this is the entry point
   - load dotenv and set port
   - create simple start function which imports the initDb();

9. Create app.ts in src

   - I added basic middleware then continued - WILL CIRCLE BACK

10. Create all files we will need

- db/models/_FILES_
- routes/_FILES_
- controllers/_FILES_

11. Create Interfaces / other types

- Inside of types, create a variable.type.ts file for each
- create interfaces and any other types here
- https://www.typescriptlang.org/docs/handbook/2/objects.html

12. Create Models for DB

- In this case, creating Student first
  - This is not needed, but I'm adding an extra function that increments ID's so as to not use Mongo's "\_id". Courses will have courseName but it serves the same purpose
  - import mongoose, { Schema, Document } from "mongoose"
  - import { IInterface } from "../../types/index.js"
  - const VariableSchema = new Schema<ICourse & Document>
  - https://mongoosejs.com/docs/guide.html

12. Create Controllers

- For this project, we will have 4 (Student/Course/Teacher/Class)
- All need "import { Router } from 'express;"
- Import the models / the semester interface for Class
- Add validation / proper status codes
  - Pretty sure it's better to put this logic in specific error types since it repeats, but I've already put too much time into building them
- Export each one

13. Create the Routes

- Routes need to have an index.ts, then all routes are connected to it
- Import all controllers for each specific route
- export router for each

14. Swagger

- npm install swagger-ui-express && @types/swagger-ui-express
- Either use swagger-autocomplete and manually create a swagger.JSON file
- https://swagger.io/docs/specification/v2_0/basic-structure/

15. Auth

- For auth, we are using email/passwords and we will be using sessions.
- Create an Auth folder to store everything inside
- Create a new "users" collection in MongoDB to store our user credentials

* -- Found out we are required to use OAuth, so this is somewhat pointless above. Will be creating a separate auth flow for Google/OAuth.

16. OAuth

- First create a oAuth app in Github (profile > settings > sev settings > new OAuth)
- Add domain / callback URL and copy client id/secret (add these to ENV and render env)
- npm install passport (https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x) / express-session since passport needs it
- Create the passport config / mongo model for the new Oauth user / OAuth user type (matching Github)
- Create new MongoDB collection for these users (we will have 2 separate tables, one for users signing in with trad account and one for Oauth)
-
