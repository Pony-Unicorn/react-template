import * as React from 'react'
import { getBoxStyles, type BoxProps } from './layout-utils'

const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { className, ...rest } = getBoxStyles(props)
  return <div ref={ref} className={className} {...rest} />
})

Box.displayName = 'Box'

export { Box }
