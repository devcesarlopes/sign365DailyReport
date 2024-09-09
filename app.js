'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const cron = require('node-cron');
const { fetchPocketbaseToken } = require('./pocketbase/token');
const { dailySubmissionReport } = require('./pocketbase/dailySubmissionReport');
const { createDailyReport } = require('./pocketbase/createDailyReport');
const { convertMilliseconds } = require('./hooks/date');
const qrCode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

let clientIsReady = false;
let cronIsRunning = false;

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  console.log('client.on qr');
  const qrCodeOptions = {
    email: true, 
    small: true
  };
  qrCode.generate(qr, qrCodeOptions);
});

client.on('ready', async () => {
  clientIsReady = true;
  console.log('Whatsapp client is ready!');
});

client.initialize();

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.addHook('onReady', async () => {
    console.log('Server has started and is ready!');
  });

  cron.schedule('*/1 * * * *', async () => {
    if (cronIsRunning) {
      return;
    }
    if (!clientIsReady) {
      console.log('cron.schedule', new Date(), 'Client Is Not Ready');
      return;
    }
    console.log('cron.schedule', new Date());
    cronIsRunning = true;
    try {
      console.log('Getting Chats...');
      const date = new Date();
      const chats = await client.getChats();
      console.log(`Fetched Chats in ${convertMilliseconds(new Date().getTime() - date.getTime())}`)
      const sign365Group = chats.find(g => g.name === 'Biz365 Development Team');
      if (!sign365Group) {
          console.log('ERROR: COULD NOT FIND SIGN 365 GROUP');
          return;
      }
      const pocketbaseToken = await fetchPocketbaseToken();
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const report = await dailySubmissionReport(pocketbaseToken, yesterday);
      const message = await sign365Group.sendMessage(report);
      await createDailyReport(pocketbaseToken, report)
      console.log('MESSAGE SUCCESSFULLY SENT');
    } catch (error) {
      console.log(error);
    }
    cronIsRunning = false;
  });
   

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
