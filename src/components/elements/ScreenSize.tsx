import { Badge, Box } from '@radix-ui/themes'

import { IS_LOCAL } from '~/constants/app'

export function ScreenSize() {
  if (!IS_LOCAL) return null

  return (
    <Box position="fixed" bottom="2" left="2" style={{ zIndex: 50 }}>
      <Badge size="1" variant="solid" highContrast>
        <Box
          display={{
            initial: 'none',
            xs: 'none',
            sm: 'none',
            md: 'none',
            lg: 'none',
            xl: 'block',
          }}
        >
          xl
        </Box>
        <Box
          display={{
            initial: 'none',
            xs: 'none',
            sm: 'none',
            md: 'none',
            lg: 'block',
            xl: 'none',
          }}
        >
          lg
        </Box>
        <Box
          display={{
            initial: 'none',
            xs: 'none',
            sm: 'none',
            md: 'block',
            lg: 'none',
          }}
        >
          md
        </Box>
        <Box display={{ initial: 'none', xs: 'none', sm: 'block', md: 'none' }}>
          sm
        </Box>
        <Box display={{ initial: 'none', xs: 'block', sm: 'none' }}>xs</Box>
        <Box display={{ initial: 'block', xs: 'none' }}>initial</Box>
      </Badge>
    </Box>
  )
}
