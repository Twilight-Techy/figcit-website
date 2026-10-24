import type { Access, FieldAccess } from 'payload'

// Shared access rules. Every collection sets all four operations explicitly (rules §6).
export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const authenticatedField: FieldAccess = ({ req }) => Boolean(req.user)

// Public visitors see published documents only; admins see drafts too.
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }
