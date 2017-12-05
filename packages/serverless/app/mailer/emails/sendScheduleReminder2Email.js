import PostmarkMailer from '../../../config/PostmarkMailer'

export default function sendScheduleReminder2Email({
  firstName,
  recipientEmail,
  actionUrl,
}) {
  if (firstName && recipientEmail && actionUrl) {
    return new Promise((resolve, reject) => {
      PostmarkMailer.sendEmailWithTemplate(
        {
          From: 'hello@toktumi.io',
          To: recipientEmail,
          TemplateId: 1501841,
          TemplateModel: {
            name: firstName,
            action_url: actionUrl,
          },
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })
  } else
    throw new Error('Email requires firstName, actionUrl and reciepientEmail.')
}