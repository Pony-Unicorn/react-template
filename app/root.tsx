import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import { Container, Flex, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { ScreenSize } from '~/components/elements/ScreenSize'
import { Footer } from '~/components/shared/Footer'
import NotFound from '~/components/shared/NotFound'
import { SiteHeader } from '~/components/shared/SiteHeader'
// import { Toaster } from '~/components/ui/sonner'
import AppKitProvider from '~/context/AppKitProvider'
import type { Route } from './+types/root'
import './app.css'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Bolt' },
    {
      name: 'description',
      content:
        'dApp framework built using React Router, @reown/appkit and more! ',
    },
  ]
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme
          accentColor="indigo"
          grayColor="slate"
          appearance="dark"
          radius="medium"
          scaling="100%"
          panelBackground="translucent"
        >
          <AppKitProvider>
            {/* <Box></Box> */}
            <Flex gap="3" minHeight="100vh" direction="column">
              <SiteHeader />
              <Container position="relative" align="center" flexShrink="1">
                {children}
              </Container>
              <Footer />
            </Flex>
          </AppKitProvider>
        </Theme>
        {/* <Toaster /> */}
        <ScreenSize />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return <NotFound message={message} details={details} stack={stack} />
}
