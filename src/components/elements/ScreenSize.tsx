import { Box } from '@radix-ui/themes'

const BREAKPOINTS = [
  { name: 'xl', display: { initial: 'none', xl: 'block' } },
  { name: 'lg', display: { initial: 'none', lg: 'block', xl: 'none' } },
  { name: 'md', display: { initial: 'none', md: 'block', lg: 'none' } },
  { name: 'sm', display: { initial: 'none', sm: 'block', md: 'none' } },
  { name: 'xs', display: { initial: 'none', xs: 'block', sm: 'none' } },
  { name: 'initial', display: { initial: 'block', xs: 'none' } },
] as const

export function ScreenSize() {
  return (
    <Box
      style={{
        position: 'absolute',
        left: '4px',
        bottom: '8px',
        padding: '4px 8px',
        fontSize: '12px',
        color: 'var(--accent-contrast)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {BREAKPOINTS.map(({ name, display }) => (
        <Box key={name} as="span" display={display}>
          {name}
        </Box>
      ))}
    </Box>
  )
}
