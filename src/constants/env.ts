import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_',

  client: {
    VITE_APP_MODE: z.enum(['pro', 'dev']).default('dev'),
    VITE_PROJECT_ID: z.string().min(32),
  },

  runtimeEnvStrict: {
    VITE_APP_MODE: import.meta.env.VITE_APP_MODE,
    VITE_PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
  },

  emptyStringAsUndefined: true,
})
