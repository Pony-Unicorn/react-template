import { cn } from '~/lib/utils'

export const spacingMap = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  '12': '12',
  '16': '16',
  '20': '20',
  '24': '24',
  '32': '32',
  '40': '40',
  '48': '48',
  '56': '56',
  '64': '64',
  auto: 'auto',
  px: 'px',
} as const

export type Spacing = keyof typeof spacingMap

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  p?: Spacing
  px?: Spacing
  py?: Spacing
  pt?: Spacing
  pr?: Spacing
  pb?: Spacing
  pl?: Spacing
  m?: Spacing
  mx?: Spacing
  my?: Spacing
  mt?: Spacing
  mr?: Spacing
  mb?: Spacing
  ml?: Spacing
  width?: Spacing | 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit'
  height?: Spacing | 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit'
  display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none'
}

export function getBoxStyles(props: BoxProps) {
  const {
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    width, height, display,
    className,
    ...rest
  } = props

  return {
    className: cn(
      display === 'block' && 'block',
      display === 'inline-block' && 'inline-block',
      display === 'inline' && 'inline',
      display === 'flex' && 'flex',
      display === 'inline-flex' && 'inline-flex',
      display === 'grid' && 'grid',
      display === 'inline-grid' && 'inline-grid',
      display === 'none' && 'hidden',

      // Padding
      p && `p-${spacingMap[p]}`,
      px && `px-${spacingMap[px]}`,
      py && `py-${spacingMap[py]}`,
      pt && `pt-${spacingMap[pt]}`,
      pr && `pr-${spacingMap[pr]}`,
      pb && `pb-${spacingMap[pb]}`,
      pl && `pl-${spacingMap[pl]}`,

      // Margin
      m && `m-${spacingMap[m]}`,
      mx && `mx-${spacingMap[mx]}`,
      my && `my-${spacingMap[my]}`,
      mt && `mt-${spacingMap[mt]}`,
      mr && `mr-${spacingMap[mr]}`,
      mb && `mb-${spacingMap[mb]}`,
      ml && `ml-${spacingMap[ml]}`,

      // Size
      width && (spacingMap[width as Spacing] ? `w-${spacingMap[width as Spacing]}` : (
        width === 'full' ? 'w-full' :
        width === 'screen' ? 'w-screen' :
        width === 'min' ? 'w-min' :
        width === 'max' ? 'w-max' :
        width === 'fit' ? 'w-fit' :
        width === 'auto' ? 'w-auto' : ''
      )),

      height && (spacingMap[height as Spacing] ? `h-${spacingMap[height as Spacing]}` : (
        height === 'full' ? 'h-full' :
        height === 'screen' ? 'h-screen' :
        height === 'min' ? 'h-min' :
        height === 'max' ? 'h-max' :
        height === 'fit' ? 'h-fit' :
        height === 'auto' ? 'h-auto' : ''
      )),

      className
    ),
    ...rest,
  }
}

export interface FlexProps extends BoxProps {
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: Spacing
}

export function getFlexStyles(props: FlexProps) {
  const { align, justify, direction, wrap, gap, ...boxProps } = props
  const { className, ...rest } = getBoxStyles({ display: 'flex', ...boxProps })

  return {
    className: cn(
      className,
      align === 'start' && 'items-start',
      align === 'center' && 'items-center',
      align === 'end' && 'items-end',
      align === 'baseline' && 'items-baseline',
      align === 'stretch' && 'items-stretch',

      justify === 'start' && 'justify-start',
      justify === 'center' && 'justify-center',
      justify === 'end' && 'justify-end',
      justify === 'between' && 'justify-between',
      justify === 'around' && 'justify-around',
      justify === 'evenly' && 'justify-evenly',

      direction === 'row' && 'flex-row',
      direction === 'column' && 'flex-col',
      direction === 'row-reverse' && 'flex-row-reverse',
      direction === 'column-reverse' && 'flex-col-reverse',

      wrap === 'nowrap' && 'flex-nowrap',
      wrap === 'wrap' && 'flex-wrap',
      wrap === 'wrap-reverse' && 'flex-wrap-reverse',

      gap && `gap-${spacingMap[gap]}`
    ),
    ...rest,
  }
}

export interface GridProps extends BoxProps {
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none'
  rows?: '1' | '2' | '3' | '4' | '5' | '6' | 'none'
  gap?: Spacing
  gapX?: Spacing
  gapY?: Spacing
  flow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'
}

export function getGridStyles(props: GridProps) {
  const { columns, rows, gap, gapX, gapY, flow, ...boxProps } = props
  const { className, ...rest } = getBoxStyles({ display: 'grid', ...boxProps })

  return {
    className: cn(
      className,
      columns === '1' && 'grid-cols-1',
      columns === '2' && 'grid-cols-2',
      columns === '3' && 'grid-cols-3',
      columns === '4' && 'grid-cols-4',
      columns === '5' && 'grid-cols-5',
      columns === '6' && 'grid-cols-6',
      columns === '7' && 'grid-cols-7',
      columns === '8' && 'grid-cols-8',
      columns === '9' && 'grid-cols-9',
      columns === '10' && 'grid-cols-10',
      columns === '11' && 'grid-cols-11',
      columns === '12' && 'grid-cols-12',
      columns === 'none' && 'grid-cols-none',

      rows === '1' && 'grid-rows-1',
      rows === '2' && 'grid-rows-2',
      rows === '3' && 'grid-rows-3',
      rows === '4' && 'grid-rows-4',
      rows === '5' && 'grid-rows-5',
      rows === '6' && 'grid-rows-6',
      rows === 'none' && 'grid-rows-none',

      flow === 'row' && 'grid-flow-row',
      flow === 'col' && 'grid-flow-col',
      flow === 'dense' && 'grid-flow-dense',
      flow === 'row-dense' && 'grid-flow-row-dense',
      flow === 'col-dense' && 'grid-flow-col-dense',

      gap && `gap-${spacingMap[gap]}`
    ),
    ...rest,
  }
}