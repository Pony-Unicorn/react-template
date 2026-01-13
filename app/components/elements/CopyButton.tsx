import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

interface CopyButtonProps {
  value: string
  children?: React.ReactNode
}

export async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value)
}

export function CopyButton({ value, children }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  return (
    <Button
      variant="soft"
      onClick={async () => {
        await copyToClipboard(value)
        setHasCopied(true)
      }}
    >
      <Flex align="center" gap="2">
        {children && <Text size="2">{children}</Text>}
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
      </Flex>
    </Button>
  )
}
