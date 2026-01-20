import { Container, Flex } from '@radix-ui/themes'
import { Outlet } from 'react-router'
import { Footer } from '~/components/shared/Footer'
import { SiteHeader } from '~/components/shared/SiteHeader'

export default function Root() {
  return (
    <Flex gap="3" minHeight="100vh" direction="column">
      <SiteHeader />
      <Container position="relative" align="center" flexShrink="1">
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  )
}
