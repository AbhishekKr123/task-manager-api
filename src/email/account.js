const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'abhishekbhaskar35@gmail.com',
    subject: 'Thanks for joining in',
    text: `Welcome to the App, ${name}.Let me know how you get along with the app.`
  })
}

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'abhishekbhaskar35@gmail.com',
    subject: 'Sorry for letting you disappointment',
    text: `Please tell us what can we improve`
  })

}

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
}