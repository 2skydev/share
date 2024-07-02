const { PHASE_PRODUCTION_BUILD } = require('next/constants')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
const configWrapper = async phase => {
  let config = nextConfig

  if (phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import('@serwist/next')).default({
      swSrc: 'src/app/sw.ts',
      swDest: 'public/sw.js',
    })

    config = withSerwist(config)
  }

  return config
}

module.exports = configWrapper