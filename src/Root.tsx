import { Container, Flex, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { Outlet } from 'react-router'
import '~/app.css'
import { ScreenSize } from '~/components/elements/ScreenSize'
import { Footer } from '~/components/shared/Footer'
import { SiteHeader } from '~/components/shared/SiteHeader'
import AppKitProvider from '~/context/AppKitProvider'

export default function Root() {
  return (
    <Theme
      accentColor="indigo"
      grayColor="slate"
      appearance="dark"
      radius="medium"
      scaling="100%"
      panelBackground="translucent"
    >
      <AppKitProvider>
        <Flex gap="3" minHeight="100vh" direction="column">
          <SiteHeader />
          <Container position="relative" align="center" flexShrink="1">
            <Outlet />
          </Container>
          <Footer />
        </Flex>
      </AppKitProvider>
      <ScreenSize />
    </Theme>
  )
}
