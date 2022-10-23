export const auth0 = {
  secret: process.env.AUTH0_SECRET,
  baseUrl: process.env.PUBLIC_AUTH0_BASE_URL || "http://localhost:8888",
  issuerBaseUrl: process.env.PUBLIC_AUTH0_ISSUER_BASE_URL || "https://awesome-assets.jp.auth0.com",
  audienceBaseUrl: process.env.PUBLIC_AUTH0_AUDIENCE_BASE_URL || "http://localhost:8889",
  clientId: process.env.PUBLIC_AUTH0_CLIENT_ID || "M2oLYOypjBA743vQdE1uhQhFNPbBXsze",
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
}
