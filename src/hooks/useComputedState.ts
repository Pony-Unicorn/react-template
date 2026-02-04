import { useCallback, useMemo, useRef, useState } from 'react'

/**
 * useComputedState
 *
 * 一个用于维护「真实值」与「派生显示值」的 React Hook。
 *
 * ### 功能特性
 * - 支持函数式更新：`setRealValue(prev => prev + 1)`
 * - 自动计算 displayValue = compute(realValue)
 * - 性能优化：即便传入内联 compute 函数也不会导致多余重算
 * - 容错处理：数据缺失 (null/undefined/NaN/空字符串) 默认显示 "--"
 *
 * ### 🧩 基本用法
 * ```tsx
 * const { realValue, displayValue, setRealValue } = useComputedState<number>(10, v => v * 2);
 * // realValue = 10, displayValue = "20"
 * ```
 */

export type RealValueType = number | bigint | string | null | undefined

const defaultCompute = (v: RealValueType): string => {
  if (v === null || v === undefined || v === '' || Number.isNaN(v)) return '--'
  return v.toString()
}

export function useComputedState<T extends RealValueType>(
  initialValue: T,
  compute: (value: T) => string = defaultCompute
) {
  const [realValue, setRealValue] = useState<T>(initialValue)

  // 使用 ref 锁定 compute 函数，避免因外部传入内联函数导致 useMemo 频繁失效
  const computeRef = useRef(compute)
  computeRef.current = compute

  const displayValue = useMemo(() => {
    try {
      return computeRef.current(realValue)
    } catch (error) {
      console.warn('useComputedState compute error:', error)
      return defaultCompute(realValue)
    }
  }, [realValue]) // 仅在真实值变化时重新计算

  const updateRealValue = useCallback((next: T | ((prev: T) => T)) => {
    setRealValue(next)
  }, [])

  return { realValue, setRealValue: updateRealValue, displayValue }
}
