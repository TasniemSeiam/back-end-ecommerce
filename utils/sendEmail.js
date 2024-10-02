const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "moustafaashraf20@gmail.com",
      pass: "geua mupb ptex rmoj",
    },
  });

  const mailOptions = {
    from: "moustafaashraf20@gmail.com",
    to: email,
    subject: subject,
    html:html ,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail ;  