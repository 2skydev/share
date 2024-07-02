import { Config } from 'tailwindcss'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '@/../tailwind.config'

interface CustomConfig extends Config {
  theme: {
    extend: {}
  }
}

export const { theme } = resolveConfig<CustomConfig>(tailwindConfig as CustomConfig)
