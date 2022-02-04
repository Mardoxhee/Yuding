const dotenv = require("dotenv").config();

console.log(process.env.TWILIO_AUTH_TOKEN);

const sendSms = async (options) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: options.body,
      from: "+17622429221",
      to: options.to,
    })
    .then((message) => console.log(message.sid));
};
module.exports = sendSms;
