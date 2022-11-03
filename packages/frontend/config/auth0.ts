if (
  !(
    process.env.NEXT_PUBLIC_AUTH0_BASE_URL &&
    process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL &&
    process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_BASE_URL &&
    process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
  )
) {
  throw new Error("Missing required environment variables.");
}

export const auth0 = {
  secret: process.env.AUTH0_SECRET,
  baseUrl: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
  issuerBaseUrl: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
  audienceBaseUrl: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE_BASE_URL,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
};
