import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { type AppKitNetwork } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { WagmiProvider, type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

import { IS_LOCAL, IS_PRO } from '~/constants/app'
import { env } from '~/constants/env'

export const projectId = env.VITE_PROJECT_ID

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = IS_PRO
  ? [mainnet]
  : [sepolia]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks,
})

// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://bolt.testbug.cc', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  themeMode: 'light' as const,
  // themeVariables: {
  //   '--w3m-accent': '#000000',
  // },
  projectId,
  networks,
  metadata: metadata,
  features: {
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
  },
  // allWallets: 'ONLY_MOBILE',
  debug: IS_LOCAL,
  enableEIP6963: true,
  enableCoinbase: false, // default to true, Remove Coinbase
  featuredWalletIds: [
    // '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
  ],
})

function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default AppKitProvider
