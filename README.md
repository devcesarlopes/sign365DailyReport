# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.
It consists in a NodeJs service that is called by a cron (Fixed schedule).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Editing Cron

To edit the cron of the services (time elapsed till service call), you just have to edit the `cron.schedule()` parameter in the [app.js](./app.js) file.

## Editing Service workflow

To edit the service workflow you have to edit the `syncDocuments()` function in the [syncDocuments.js](./routes/syncDocuments.js) file, this is the function that is called by the cron.

## Deploying Service

To deploy just run the command `yarn deploy`.

- Would you like to copy its configuration to the new app? `y` 

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).
