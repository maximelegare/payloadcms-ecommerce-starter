import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  PORT: z.string(),
  DATABASE_URI: z.string(),
  PAYLOAD_SECRET: z.string(),
  PAYLOAD_PUBLIC_SERVER_URL: z.string(),

  STRIPE_SECRET_KEY: z.string(),
  PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY: z.string(),

  STRIPE_WEBHOOKS_SIGNING_SECRET: z.string(),

  PAYLOAD_PUBLIC_DRAFT_SECRET: z.string(),

  REVALIDATION_KEY: z.string(),
})

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object(
  /** @satisfies {Record<`NEXT_PUBLIC_${string}`, import('zod').ZodType>} */ {
    NEXT_PUBLIC_SERVER_URL: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_IS_LIVE: z.string(),
    NEXT_PRIVATE_DRAFT_SECRET: z.string(),
    NEXT_PRIVATE_REVALIDATION_KEY: z.string(),
  },
)

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  DATABASE_URI: process.env.DATABASE_URI,
  PORT: process.env.PORT,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY: process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY,
  STRIPE_WEBHOOKS_SIGNING_SECRET: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
  PAYLOAD_PUBLIC_DRAFT_SECRET: process.env.PAYLOAD_PUBLIC_DRAFT_SECRET,
  REVALIDATION_KEY: process.env.REVALIDATION_KEY,
  NEXT_PRIVATE_DRAFT_SECRET: process.env.NEXT_PRIVATE_DRAFT_SECRET,
  NEXT_PRIVATE_REVALIDATION_KEY: process.env.NEXT_PRIVATE_REVALIDATION_KEY,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_IS_LIVE: process.env.NEXT_PUBLIC_IS_LIVE,
}

// Don't touch the part below
// --------------------------

const merged = server.merge(client)

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ process.env

const skip =
  !!process.env.SKIP_ENV_VALIDATION &&
  process.env.SKIP_ENV_VALIDATION !== 'false' &&
  process.env.SKIP_ENV_VALIDATION !== '0'
if (!skip) {
  const isServer = typeof window === 'undefined'

  const parsed = /** @type {MergedSafeParseReturn} */ isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv) // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        )
      return target[/** @type {keyof typeof target} */ prop]
    },
  })
}

export { env }
