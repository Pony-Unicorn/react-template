import { Outlet } from 'react-router'
import { Footer } from '~/components/shared/Footer'
import { SiteHeader } from '~/components/shared/SiteHeader'

export default function Root() {
  return (
    <div className="flex min-h-screen flex-col gap-3">
      <SiteHeader />
      <div className="relative container mx-auto shrink">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
