export type PaginationMetaResult = {
  total: number
  totalPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type PaginationResult<T> = PaginationMetaResult & {
  data: T[]
}
