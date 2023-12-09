export type QueryPageMetaResult = {
  totalPages: number
  isLast: boolean
  total: number
}

export type QueryPageResult<T> = QueryPageMetaResult & {
  list: T[]
}
