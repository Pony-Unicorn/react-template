import { Box, Text } from '@radix-ui/themes'

export function Footer() {
  return (
    <Box
      asChild
      mt="auto"
      py="4"
      style={{ borderTop: '1px solid var(--gray-a5)' }}
    >
      <footer>
        <Text size="2" color="gray" align="center" as="p">
          © {new Date().getFullYear()} Bolt. All rights reserved.
        </Text>
      </footer>
    </Box>
  )
}
