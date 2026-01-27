import { RiArrowRightUpLine } from '@remixicon/react'
import { AppKitButton } from '@reown/appkit/react'
import { Link, NavLink } from 'react-router'
import logoTransparent from '~/assets/logo-transparent-home.png'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 py-2 mx-auto">
        {/* Logo */}
        <Link to="/">
          <img src={logoTransparent} width={80} height={40} alt="bolt logo" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-5">
          <NavLink to="/" end>
            {({ isActive }) => (
              <span
                className={`text-sm font-medium transition-colors hover:text-foreground ${
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
                className={`text-sm font-medium transition-colors hover:text-foreground ${
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
                className={`text-sm font-medium transition-colors hover:text-foreground ${
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
                className={`text-sm font-medium transition-colors hover:text-foreground ${
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
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            rel="noreferrer"
          >
            Github
            <RiArrowRightUpLine className="w-3 h-3" />
          </a>

          <a
            href="https://x.com/shunfengge"
            target="_blank"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            rel="noreferrer"
          >
            X
            <RiArrowRightUpLine className="w-3 h-3" />
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
