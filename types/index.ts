export type QueryPageResult<T> = {
  isLast: boolean
  total: number
  list: T[]
}

