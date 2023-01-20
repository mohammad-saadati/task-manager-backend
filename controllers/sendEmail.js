const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    auth: {
      user: "macy27@ethereal.email",
      pass: "tgZ2vxgNXHSaZdtZua",
    },
  });

  let info = await transporter.sendMail({
    from: '"Mohammad Saadati 👻" <saadati.m.b@gmail.com>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  res.json(info);
};

module.exports = {
  sendEmail,
};
