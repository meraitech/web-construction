import { createRouteHandler } from "uploadthing/next"
import { ourFileRouter } from "./core"

export const runtime = 'nodejs'
export const maxDuration = 60

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/uploadthing`
      : undefined,
  },
})
