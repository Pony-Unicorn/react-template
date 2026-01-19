import { err, fromPromise, ok, Result } from 'neverthrow'

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
 * 包装 async 函数，返回 Result
 */
export const toResult = <T>(promise: Promise<T>) =>
  fromPromise(promise, normalizeError)

/**
 * 包装同步函数，返回 Result
 */
export const safeSync = <T>(fn: () => T): Result<T, Error> => {
  try {
    return ok(fn())
  } catch (e: unknown) {
    return toErr(e)
  }
}

/**
 * 更灵活的包装器，可注入错误转换、日志等
 */
export const wrapResult = async <T>(
  fn: () => Promise<T>,
  onError?: (e: unknown) => void,
  toCustomError?: (e: unknown) => Error
): Promise<Result<T, Error>> => {
  try {
    // 执行异步函数获得 Promise
    const promise = fn()

    // 使用 fromPromise，传入错误转换函数
    const result = await fromPromise(promise, (e) => {
      if (onError) onError(e)
      return toCustomError ? toCustomError(e) : normalizeError(e)
    })

    return result
  } catch (e) {
    // 防御性捕获极端情况（通常不会走这里）
    if (onError) onError(e)
    return err(toCustomError ? toCustomError(e) : normalizeError(e))
  }
}
