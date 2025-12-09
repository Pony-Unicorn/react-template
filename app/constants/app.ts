import { mainnet, sepolia } from 'wagmi/chains'

import type { Address } from 'viem'
import { env } from './env'

export const IS_PRO = env.VITE_APP_MODE === 'pro'

export const IS_DEV = env.VITE_APP_MODE === 'dev'

export const IS_LOCAL = import.meta.env.DEV

export const VERSION = '0.0.2'

export const usdtAddress: Record<number, Address> = {
  [mainnet.id]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  [sepolia.id]: '0xe7832b6B9B9F17719C48Abf6c1b774F06c0DB685',
}
