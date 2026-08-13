const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
   
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
  
        console.log("Email sent successfully");

    } catch (error) {
        console.error("Email Error:", error.message);
        throw error;
    }
};

module.exports = sendEmail;