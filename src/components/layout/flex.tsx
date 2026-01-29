import * as React from 'react'
import { getFlexStyles, type FlexProps } from './layout-utils'

const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { className, ...rest } = getFlexStyles(props)
  return <div ref={ref} className={className} {...rest} />
})

Flex.displayName = 'Flex'

export { Flex }
