import crypto from 'crypto'

/**
 * Generate a unique token
 * @returns {Promise.<void>}
 */
export function generateUniqueToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buf) => {
      if (err) {
        reject(err)
      } else {
        resolve(buf.toString('hex'))
      }
    })
  })
}

export function generateInviteEmailUrl(inviteId, token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/signup/${inviteId}/${token}`
}

export function getPasswordResetUrl(id, token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/reset/${id}/${token}`
}

/**
 * 
 * @param {Days in milliseconds} days 
 */
export function generateExpiryDate(days = 86400000) {
  const daysInMS = days || 86400000
  const now = new Date()
  return new Date(now.getTime() + daysInMS).toISOString()
}

export function generateEmailVerificationUrl(token) {
  return `${process.env.TOKTUMI_CLIENT_DOMAIN}/verify/${token}`
}
