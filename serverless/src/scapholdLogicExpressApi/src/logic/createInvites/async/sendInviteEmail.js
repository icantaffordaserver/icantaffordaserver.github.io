/**
 * Created by alexandermann on 2017-04-05.
 */
import { sendInviteEmail, sendInviteAcceptedEmail } from 'mailer'
import { generateInviteEmailUrl } from '../../../helpers/generateInviteEmailUrl'

export default async (req, res) => {
  const { id: inviteId, firstName, email, token, inviteRequest } = req.body.payload.changedInvites

  const actionUrl = generateInviteEmailUrl(inviteId, token)

  if (inviteRequest) {
    await sendInviteAcceptedEmail({
      firstName,
      recipientEmail: email,
      actionUrl,
    })
  } else {
    await sendInviteEmail({
      firstName,
      recipientEmail: email,
      actionUrl,
    })
  }

  res.status(200).send('Message sent successfully')
}
