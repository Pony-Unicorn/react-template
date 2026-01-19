import { Badge, Box } from '@radix-ui/themes'

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
    <Box position="absolute" left="1" bottom="2">
      {BREAKPOINTS.map(({ name, display }) => (
        <Box key={name} display={display}>
          <Badge variant="soft" color="gray" size="1" highContrast>
            {name}
          </Badge>
        </Box>
      ))}
    </Box>
  )
}
