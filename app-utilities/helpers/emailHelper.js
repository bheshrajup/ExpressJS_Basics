
const sendEmail = (recipient, subject, message) => {
    console.log(`Sending email to ${recipient}...`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('Email sent successfully!');
 };
 
 module.exports = sendEmail;
 