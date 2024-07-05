export const throttle = <T extends (...args: any) => any>(fn: T, delay: number): T => {
  let lastCall = 0

  return ((...args: any) => {
    const now = Date.now()

    if (now - lastCall < delay) return

    lastCall = now
    return fn(...args)
  }) as T
}

export const debounce = <T extends (...args: any) => any>(fn: T, delay: number): T => {
  let timer: NodeJS.Timeout

  return ((...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }) as T
}
