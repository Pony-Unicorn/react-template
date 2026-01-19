export const sleep = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const noop = () => {}

export const delayFrame = () => new Promise(requestAnimationFrame)
