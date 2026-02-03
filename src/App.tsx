import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import '~/app.css'
import { ScreenSize } from '~/components/elements/ScreenSize'
import NotFound from '~/components/shared/NotFound'
import { Toaster } from '~/components/ui/sonner'
import { IS_LOCAL } from '~/constants/app'
import AppKitProvider from '~/context/AppKitProvider'
import Root from '~/Root'
import About from '~/routes/About'
import Contract from '~/routes/Contract'
import Home from '~/routes/Home'
import Preview from '~/routes/Preview'

export default function App() {
  return (
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
      <Toaster />
      {/* debug info Container*/}
      {IS_LOCAL && (
        <div className="pointer-events-none fixed top-0 left-0 h-screen w-screen">
          <ScreenSize />
        </div>
      )}
    </AppKitProvider>
  )
}
