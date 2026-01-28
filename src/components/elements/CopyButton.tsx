import { RiCheckLine, RiFileCopyLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'

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
      variant="secondary"
      onClick={async () => {
        await copyToClipboard(value)
        setHasCopied(true)
      }}
      className="flex items-center gap-2"
    >
      {children && <span className="text-sm">{children}</span>}
      {hasCopied ? (
        <RiCheckLine className="h-4 w-4" />
      ) : (
        <RiFileCopyLine className="h-4 w-4" />
      )}
    </Button>
  )
}
