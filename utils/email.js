const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter to send email

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.Email_USERNAME,
      pass: process.env.Email_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Mardoxhée Luviki",
    to: options.email,
    subject: options.email,
    text: options.message,
  };
  // 3) Actually send the  email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
