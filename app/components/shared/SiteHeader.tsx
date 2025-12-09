import { ArrowUpRight } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import logoTransparent from '~/assets/logo-transparent.png'
import useScroll from '~/hooks/useScroll'
import { cn } from '~/lib/utils'

export function SiteHeader() {
  const scrolled = useScroll()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b backdrop-blur transition-all',
        scrolled && 'bg-background/50'
      )}
    >
      <div className="container mx-auto flex h-16 items-center gap-6 px-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={logoTransparent} width={112} height={112} alt="bolt logo" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'hover:text-foreground/80 text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-foreground/60'
              )
            }
          >
            首页
          </NavLink>

          <NavLink
            to="/preview"
            className={({ isActive }) =>
              cn(
                'hover:text-foreground/80 text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-foreground/60'
              )
            }
          >
            预览
          </NavLink>
          <NavLink
            to="/contract"
            className={({ isActive }) =>
              cn(
                'hover:text-foreground/80 text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-foreground/60'
              )
            }
          >
            合约
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                'hover:text-foreground/80 text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-foreground/60'
              )
            }
          >
            关于
          </NavLink>

          <a
            href="https://github.com/Pony-Unicorn/web3-template"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground/80 relative text-sm font-medium transition-colors"
          >
            Github
            <ArrowUpRight
              size={12}
              className="text-foreground/50 absolute -top-1 -right-4"
              aria-label="Opens in new window"
            />
          </a>

          <a
            href="https://x.com/shunfengge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground/80 relative text-sm font-medium transition-colors"
          >
            X
            <ArrowUpRight
              size={12}
              className="text-foreground/50 absolute -top-1 -right-4"
              aria-label="Opens in new window"
            />
          </a>
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <appkit-button />
        </div>
      </div>
    </header>
  )
}
