import { err, fromPromise, ok, Result, ResultAsync } from 'neverthrow'

/**
 * 将未知异常转换为标准 Error 对象
 */
export const normalizeError = (e: unknown): Error =>
  e instanceof Error ? e : new Error(String(e))

/**
 * 将未知异常转换为 Result<never, Error>
 */
export const toErr = (e: unknown): Result<never, Error> =>
  err(normalizeError(e))

/**
 * 包装 Promise，返回 ResultAsync
 * 允许继续使用 map/mapErr 等链式调用
 */
export const toResult = <T>(promise: Promise<T>): ResultAsync<T, Error> =>
  fromPromise(promise, normalizeError)

/**
 * 安全执行同步函数
 */
export const safeSync = <T>(fn: () => T): Result<T, Error> => {
  try {
    return ok(fn())
  } catch (e) {
    return toErr(e)
  }
}

/**
 * 专用：安全解析 JSON
 */
export const safeJsonParse = <T = unknown>(text: string): Result<T, Error> =>
  safeSync(() => JSON.parse(text))

/**
 * 高级包装器：支持 Side Effect (日志/上报) 和自定义错误转换
 * 返回 ResultAsync 以支持链式调用
 */
export const wrapResult = <T>(
  fn: () => Promise<T>,
  options?: {
    onError?: (e: unknown) => void
    toCustomError?: (e: unknown) => Error
  }
): ResultAsync<T, Error> => {
  const { onError, toCustomError } = options || {}

  const errorHandler = (e: unknown): Error => {
    if (onError) onError(e)
    return toCustomError ? toCustomError(e) : normalizeError(e)
  }

  try {
    const promise = fn()
    return fromPromise(promise, errorHandler)
  } catch (syncError) {
    // 捕获同步执行时的异常，并包装为 ResultAsync
    return ResultAsync.fromPromise(Promise.reject(syncError), errorHandler)
  }
}
