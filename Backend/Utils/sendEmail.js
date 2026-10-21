const SibApiV3Sdk = require('@getbrevo/brevo');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, htmlContent) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = {
        name: process.env.SENDER_NAME || "PrepWise AI",
        email: process.env.SENDER_EMAIL // The email address you verified in Brevo
    };
    sendSmtpEmail.to = [{ email: to }];

    return await apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = { sendEmail };