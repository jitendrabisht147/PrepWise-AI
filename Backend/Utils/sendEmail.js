/**
 * Sends a transactional email using Brevo's direct HTTPS REST API.
 * Uses native fetch (no SDK constructor issues).
 */
const sendEmail = async (to, subject, htmlContent) => {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL;
    const senderName = process.env.SENDER_NAME || "PrepWise AI";

    if (!apiKey) {
        throw new Error("BREVO_API_KEY is not defined in environment variables");
    }

    if (!senderEmail) {
        throw new Error("SENDER_EMAIL is not defined in environment variables");
    }

    const payload = {
        sender: {
            name: senderName,
            email: senderEmail,
        },
        to: [
            {
                email: to,
            },
        ],
        subject: subject,
        htmlContent: htmlContent,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": apiKey,
            "content-type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Brevo API Error:", data);
        throw new Error(data.message || "Failed to send email via Brevo");
    }

    console.log("Email dispatched successfully. Message ID:", data.messageId);
    return data;
};

module.exports = { sendEmail };