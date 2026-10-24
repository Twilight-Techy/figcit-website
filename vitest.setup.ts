// Load .env, then fill safe defaults so unit tests run without a database.
import 'dotenv/config'

process.env.DATABASE_URL ??= 'postgres://figcit:figcit@127.0.0.1:5432/figcit'
process.env.PAYLOAD_SECRET ??= 'test-secret-'.padEnd(40, 'x')
