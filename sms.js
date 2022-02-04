const twilio = require("twilio");
const dotenv = require("dotenv");
const accountSid = "AC1d4ff46bbcf6bfa5c52ceedd37a32dee";
const authToken = "776877906bd043c9ba8c904fe8dbf20b";

const client = new twilio(accountSid, authToken);
console.log(process.env.SENDGRID_API_KEY);

client.messages
  .create({
    to: "+243824005630",
    // to: "+243828261084",
    from: "+17622429221",
    body: "Bonjour bienvenue sur Yuding, la plus grande plateforme de d'exploration et de réservation des restaurants à Kinshasa!",
  })
  .then((message) => console.log(message.sid))
  .catch((error) => {
    console.error(error.message);
  });

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "YUDING  sur vos téléphones !!!",
//     from: "+17622429221",
//     to: "+243828261084",
//   })
//   .then((message) => console.log(message.sid));
