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


module.exports = {
  sendEmail,
};
