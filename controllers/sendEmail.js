const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "loy.mohr89@ethereal.email",
      pass: "2EfEkDZ4RZNKPteqXP",
    },
  });

  let info = await transporter.sendMail({
    from: '"Mohammad Saadati 👻" <saadati.m.b@gmail.com>',
    to: "saadati.m.b@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  res.json(info);
};
// const sendEmail = async (req, res) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//   const msg = {
//     to: "saadati.m.b@gmail.com", // Change to your recipient
//     from: "fordevelopmentdesire@gmail.com", // Change to your verified sender
//     subject: "Sending with SendGrid is Fun",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };

//   const info = await sgMail.send(msg);

//   res.json(info);
// };

module.exports = {
  sendEmail,
};
