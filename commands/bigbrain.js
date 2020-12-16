require('dotenv').config();
const uuid = require('uuid');
const dialogflow = require('dialogflow');
const config = require("../config.json");
const dialogflowClient = new dialogflow.SessionsClient();

module.exports = {
    main: function (bot, msg) {

        const sessionPath = dialogflowClient.sessionPath(config.DIALOGFLOW_PROJECTID, uuid.v4());
        console.log(msg.content)
        const dialogflowRequest = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: msg.content,
                    languageCode: 'en-en'
                }
            }
        };

        dialogflowClient.detectIntent(dialogflowRequest).then(responses => {
            if (responses.length == 0) return bot.sendNotification(`🧠📣: Sorry, I am out of words`, "info", msg);
            try {
                bot.sendNotification(`🧠📣: ${responses[0].queryResult.fulfillmentText}`, "success", msg);
            } catch (error) {
                bot.sendNotification(`🧠📣: I am having a brainfreeeezee❄️`, "error", msg);
            }
        });

    },
    help: 'Please talk to me, still learing brr🧠🧠',
    hide: false
};