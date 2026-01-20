import { Box, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import '~/app.css'
import { ScreenSize } from '~/components/elements/ScreenSize'
import NotFound from '~/components/shared/NotFound'
import WrapToaster from '~/components/shared/WrapToaster'
import { IS_LOCAL } from '~/constants/app'
import AppKitProvider from '~/context/AppKitProvider'
import Root from '~/Root'
import About from '~/routes/About'
import Contract from '~/routes/Contract'
import Home from '~/routes/Home'
import Preview from '~/routes/Preview'

export default function App() {
  return (
    <Theme
      accentColor="blue"
      grayColor="slate"
      appearance="dark"
      radius="medium"
      scaling="100%"
      panelBackground="translucent"
    >
      <AppKitProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contract" element={<Contract />} />
              <Route path="preview" element={<Preview />} />
              <Route
                path="*"
                element={
                  <NotFound
                    message="404"
                    details="The requested page could not be found."
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <WrapToaster />
        {/* debug info Container*/}
        {IS_LOCAL && (
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            style={{ pointerEvents: 'none' }}
          >
            <ScreenSize />
          </Box>
        )}
      </AppKitProvider>
    </Theme>
  )
}
