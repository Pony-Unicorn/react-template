import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { Box, Flex, Link as RadixLink } from '@radix-ui/themes'
import { Link, NavLink } from 'react-router'
import logoTransparent from '~/assets/logo-transparent.png'

export function SiteHeader() {
  return (
    <Box
      asChild
      position="sticky"
      top="0"
      style={{
        zIndex: 50,
        borderBottom: '1px solid var(--gray-a5)',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'var(--color-panel-translucent)',
      }}
    >
      <header>
        <Flex
          align="center"
          justify="between"
          gap="6"
          px="4"
          py="3"
          maxWidth="1200px"
          mx="auto"
        >
          {/* Logo */}
          <Link to="/">
            <img
              src={logoTransparent}
              width={100}
              height={100}
              alt="bolt logo"
            />
          </Link>

          {/* Navigation */}
          <Flex asChild align="center" gap="5">
            <nav>
              <NavLink to="/" end>
                {({ isActive }) => (
                  <RadixLink
                    asChild
                    size="2"
                    weight="medium"
                    color={isActive ? undefined : 'gray'}
                    highContrast={isActive}
                  >
                    <span>首页</span>
                  </RadixLink>
                )}
              </NavLink>

              <NavLink to="/preview">
                {({ isActive }) => (
                  <RadixLink
                    asChild
                    size="2"
                    weight="medium"
                    color={isActive ? undefined : 'gray'}
                    highContrast={isActive}
                  >
                    <span>预览</span>
                  </RadixLink>
                )}
              </NavLink>

              <NavLink to="/contract">
                {({ isActive }) => (
                  <RadixLink
                    asChild
                    size="2"
                    weight="medium"
                    color={isActive ? undefined : 'gray'}
                    highContrast={isActive}
                  >
                    <span>合约</span>
                  </RadixLink>
                )}
              </NavLink>

              <NavLink to="/about">
                {({ isActive }) => (
                  <RadixLink
                    asChild
                    size="2"
                    weight="medium"
                    color={isActive ? undefined : 'gray'}
                    highContrast={isActive}
                  >
                    <span>关于</span>
                  </RadixLink>
                )}
              </NavLink>

              <RadixLink
                href="https://github.com/Pony-Unicorn/web3-template"
                target="_blank"
                size="2"
                weight="medium"
                color="gray"
              >
                <Flex align="center" gap="1">
                  Github
                  <ArrowTopRightIcon width={12} height={12} />
                </Flex>
              </RadixLink>

              <RadixLink
                href="https://x.com/shunfengge"
                target="_blank"
                size="2"
                weight="medium"
                color="gray"
              >
                <Flex align="center" gap="1">
                  X
                  <ArrowTopRightIcon width={12} height={12} />
                </Flex>
              </RadixLink>
            </nav>
          </Flex>

          {/* Right side actions */}
          <Box>
            <appkit-button />
          </Box>
        </Flex>
      </header>
    </Box>
  )
}
