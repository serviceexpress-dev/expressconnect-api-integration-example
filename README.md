# ExpressConnect API Integration Example
This repo contains an example API wrapper *(an API that wraps the ExpressConnectAPI)* using Vue.js and an Express.js  server. The intent is to give a small example of a service that can make queries to the ExpressConnect API, along with a front end client that can use that data to render some views in a browser. The API wrapper makes [REST](https://restfulapi.net/) calls to the ExpressConnect API -- so you may want to start by examining the JavaScript code in [/api-wrapper/server.js](https://github.com/ServiceExpress/api-integration-example/tree/master/api-wrapper/server.js) to get a feel for how to interact with the API. The [VueJS](https://vuejs.org/) client may be useful for inspiration or even just testing purposes.

If you don’t have an API key yet, reach out to your Integrations Specialist. This API key will provide you access to your company’s data

*Note: This project assumes you have [npm installed](https://www.npmjs.com/get-npm)*.

Disclaimer: This is *example* code, for use as inspiration for development of your own integration! We have used it in our development of the API in order to test and thought it would be helpful to others integrating with ExpressConnect API. See LICENSE for more information.

## Running the API Wrapper

#### *Install API Wrapper Dependencies*

*From the project root directory*
```
npm install --prefix ./api-wrapper
```

#### *Create the `.env` file*
To make sure we don't commit any sensitive information to source control, we use [dotenv](https://github.com/motdotla/dotenv#readme) to manage sensitive information and/or configuration options. Navigate to the `./api-wrapper/` directory and copy the contents of `.env.example` to a new file `.env` in the `api-wrapper` folder. Make sure to replace the API key with your own. The API wrapper points to the test api by default, when you are ready to go to production, change the `EXPRESS_CONNECT_API_URL` over to the production value. 

#### *Run the API Wrapper*

*From the project root directory*

```
npm run start-api
```

## Running the Vue Client

Now that we have the API wrapper running locally in our terminal, we can open a new terminal window and set up the client application.

#### *Install Client Dependencies*

*From the project root directory*
```
npm install
```

#### *Run the Vue Client*

*Note: The API must be running for the Vue client to properly load data*
```
npm run start-client
```

#### *Open the client in your browser*

By default, the client will run at [http://localhost:8080](http://localhost:8080).
