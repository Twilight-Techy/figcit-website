import { APIError, Forbidden, type CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const MIN_PASSWORD_LENGTH = 12

// Admin accounts only; there are no public user accounts on the website.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    },
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    // While there are no users, Payload lets anyone open /admin and create the first
    // admin. Block that from the web unless ALLOW_FIRST_ADMIN=true is set for the first
    // deploy (docs/DEPLOYMENT.md). Signed-in admins and server code are unaffected.
    beforeOperation: [
      ({ operation, req }) => {
        if (
          operation === 'create' &&
          !req.user &&
          req.payloadAPI !== 'local' &&
          process.env.ALLOW_FIRST_ADMIN !== 'true'
        ) {
          throw new Forbidden(req.t)
        }
      },
    ],
    beforeValidate: [
      ({ data }) => {
        const password: unknown = data?.password
        if (typeof password === 'string' && password.length < MIN_PASSWORD_LENGTH) {
          throw new APIError(`Passwords must be at least ${MIN_PASSWORD_LENGTH} characters`, 400)
        }
        return data
      },
    ],
  },
  fields: [],
}
