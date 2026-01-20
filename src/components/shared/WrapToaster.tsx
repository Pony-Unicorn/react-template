import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'

import { Toaster } from 'sonner'

export default function WrapToaster() {
  return (
    <Toaster
      icons={{
        success: <CheckCircledIcon />,
        info: <InfoCircledIcon />,
        warning: <ExclamationTriangleIcon />,
        error: <CrossCircledIcon />,
      }}
      style={
        {
          // '--normal-bg': 'var(--accent-surface)',
          // '--normal-border': 'var(--gray-a6)',
          // '--normal-text': 'var(--gray-12)',
          // '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius-2)',
        } as React.CSSProperties
      }
    />
  )
}
