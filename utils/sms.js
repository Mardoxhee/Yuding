const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);
console.log(accountSid);
console.log("bish");
client.messages
  .create({
    to: "+243973542092",
    from: "+17622429221",
    body: "message comming from Yuding.platform",
  })
  .then((message) => console.log(message.sid))
  .catch((error) => {
    console.error(error.message);
  });
