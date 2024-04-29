let baseTime = Date.now()

export function warn(message?: any, ...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    const time = Date.now() - baseTime
    console.warn(`T+${time} | ${message}`, ...args)
  }
}

export function error(message?: any, ...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    const time = Date.now() - baseTime
    console.error(`T+${time} | ${message}`, ...args)
  }
}

export function info(message?: any, ...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    const time = Date.now() - baseTime
    console.info(`T+${time} | ${message}`, ...args)
  }
}
