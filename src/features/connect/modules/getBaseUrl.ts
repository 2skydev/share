export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
