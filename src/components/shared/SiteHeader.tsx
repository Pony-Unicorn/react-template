import { RiArrowRightUpLine } from '@remixicon/react'
import { AppKitButton } from '@reown/appkit/react'
import { Link, NavLink } from 'react-router'
import logoTransparent from '~/assets/logo-transparent-home.png'

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/">
          <img src={logoTransparent} width={80} height={40} alt="bolt logo" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-5">
          <NavLink to="/" end>
            {({ isActive }) => (
              <span
                className={`hover:text-foreground text-sm font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                首页
              </span>
            )}
          </NavLink>

          <NavLink to="/preview">
            {({ isActive }) => (
              <span
                className={`hover:text-foreground text-sm font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                预览
              </span>
            )}
          </NavLink>

          <NavLink to="/contract">
            {({ isActive }) => (
              <span
                className={`hover:text-foreground text-sm font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                合约
              </span>
            )}
          </NavLink>

          <NavLink to="/about">
            {({ isActive }) => (
              <span
                className={`hover:text-foreground text-sm font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                关于
              </span>
            )}
          </NavLink>

          <a
            href="https://github.com/Pony-Unicorn/web3-template"
            target="_blank"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors"
            rel="noreferrer"
          >
            Github
            <RiArrowRightUpLine className="h-3 w-3" />
          </a>

          <a
            href="https://x.com/shunfengge"
            target="_blank"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors"
            rel="noreferrer"
          >
            X
            <RiArrowRightUpLine className="h-3 w-3" />
          </a>
        </nav>

        {/* Right side actions */}
        <div>
          <AppKitButton />
        </div>
      </div>
    </header>
  )
}
