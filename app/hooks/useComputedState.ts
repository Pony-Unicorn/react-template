import { useCallback, useMemo, useState } from 'react'

/**
 * useComputedState
 *
 * 一个用于维护「真实值」与「派生显示值」的 React Hook。
 *
 * ### 功能特性
 * - 支持函数式更新：`setRealValue(prev => prev + 1)`
 * - 自动计算 displayValue = compute(realValue)
 * - compute 默认是恒等函数：v => v
 * - 类型安全，轻量无副作用
 *
 * ---
 *
 * ### 🧩 基本用法
 * ```tsx
 * const { realValue, displayValue, setRealValue } = useComputedState(10, v => v * 2);
 * // realValue = 10
 * // displayValue = 20
 * setRealValue(prev => prev + 1);
 * // realValue = 11
 * // displayValue = 22
 * ```
 *
 * ### 💰 示例：格式化金额显示
 * ```tsx
 * const { realValue, displayValue, setRealValue } = useComputedState(12345, v =>
 *   v.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })
 * );
 *
 * <div>
 *   <input
 *     type="number"
 *     value={realValue}
 *     onChange={e => setRealValue(Number(e.target.value))}
 *   />
 *   <p>显示值：{displayValue}</p>
 * </div>
 * ```
 *
 * ### ⚙️ 默认 compute（无需自定义）
 * 模拟 useQuery 封装
 * ```tsx
 * const { realValue, displayValue, setRealValue } = useComputedState("hello");
 * // compute 默认为 v => v
 * // displayValue === realValue
 * ```
  - 真实值（number、bigint、string）、显示值（string）、更新真实值函数=初始值、计算函数、
  - 最佳实践：数据获取中使用 Skeleton 组件，数据获取失败整个区域/卡片显示错误提示，数据获取成功使用 compute 格式化显示
  - 数据缺失/不适用（null/undefined/nan/ ""/0/0n ）使用简洁的 “--”
 */

export type RealValueType = number | bigint | string

const defaultCompute = (v: RealValueType) => v.toString()

export function useComputedState<T extends RealValueType>(
  initialValue: T,
  compute: (value: T) => string = defaultCompute
) {
  const [realValue, setRealValue] = useState<T>(initialValue)

  // 根据 realValue 计算派生值
  const displayValue = useMemo(() => {
    try {
      return compute(realValue)
    } catch (error) {
      console.warn('useComputedState compute error:', error)
      return defaultCompute(realValue)
    }
  }, [realValue, compute])

  // 支持函数式更新（与 useState 相同）
  const updateRealValue = useCallback((next: T | ((prev: T) => T)) => {
    setRealValue((prev) => {
      if (typeof next === 'function') {
        return (next as (prev: T) => T)(prev)
      }
      return next
    })
  }, [])

  return { realValue, setRealValue: updateRealValue, displayValue }
}
