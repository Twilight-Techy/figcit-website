import 'server-only'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

let cached: Promise<Payload> | null = null

// One Payload instance per server process (rules §4). Always use this helper.
export function getPayloadClient(): Promise<Payload> {
  cached ??= getPayload({ config })
  return cached
}
