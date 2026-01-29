import * as React from 'react'
import { getGridStyles, type GridProps } from './layout-utils'

const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { className, ...rest } = getGridStyles(props)
  return <div ref={ref} className={className} {...rest} />
})

Grid.displayName = 'Grid'

export { Grid }
