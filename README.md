## URL Shortener


A simple URL Shortener

An application used to transform big url's into small ones, built with Node.js, NestJS, Typeorm, Postgres, and Typescript.



## Installation and Setup Instructions



Clone down this repository and replace `.env.example` content with your sensitive data to a `.env.development` file

### Without Docker  

Installation:

`npm install` or `yarn`  

To Run Test Suite:  

`npm run test` or `yarn test`  

To Start Server:

`npm start` or `yarn start`
  

To Start Development Server:

`npm run start:dev` or `yarn start:dev`

To Visit App Documentation:

`http://localhost:8080/api/docs`

### With Docker

To start Development Server

`npm run deploy:local` or `yarn deploy:local`

## Environments

Currently is running by a docker into a EC2 micro instance at AWS. (I Choose AWS because I already have some things running there).
 
- http://ec2-3-15-207-40.us-east-2.compute.amazonaws.com:8080/api/docs/
