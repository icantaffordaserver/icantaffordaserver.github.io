import crypto from 'crypto'
import { isEmail } from 'validator'

import getUserByEmailQuery from '../graphql/queries/getUserByEmailQuery'

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
  return `https://toktumi-client.ngrok.io/signUp1/${inviteId}/${token}`
}

export function generateExpiryDate() {
  const now = new Date()
  return new Date(now.getTime() + 86400000).toISOString()
}

export function generateEmailVerificationUrl(token) {
  return `https://toktumi-client.ngrok.io/verify/${token}`
}

export async function isValidEmail(email, client) {
  if (!isEmail(email)) return false

  const userExits = await client.request(getUserByEmailQuery, {
    email,
  })

  if (userExits.User) return false

  return true
}
