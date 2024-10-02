/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_PARAMS_API_URL: process.env.NEXT_PUBLIC_PARAMS_API_URL,
    NEXT_PUBLIC_PARAMSV2_API_URL: process.env.NEXT_PUBLIC_PARAMSV2_API_URL,
    NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    API_SECRET: process.env.API_SECRET,
  },
}

export default nextConfig
