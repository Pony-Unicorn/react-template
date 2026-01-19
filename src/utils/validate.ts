import { z } from 'zod'

// string
export const isString = (input: unknown): input is string =>
  z.string().safeParse(input).success

// number
export const isNumber = (input: unknown): input is number =>
  z.number().safeParse(input).success

// boolean
export const isBoolean = (input: unknown): input is boolean =>
  z.boolean().safeParse(input).success

// array（泛型）
export const isArray = <T = unknown>(input: unknown): input is T[] =>
  z.array(z.any()).safeParse(input).success

// object（不校验 shape，仅判断是否为非 null 的 object）
export const isObject = (input: unknown): input is Record<string, unknown> =>
  z.record(z.string(), z.any()).safeParse(input).success

// bigint
export const isBigInt = (input: unknown): input is bigint =>
  z.bigint().safeParse(input).success
