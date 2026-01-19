export type IApiMessage = { message: string }

export type IApiListResponse<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type ILogin = {
  nickname: string
  avatarUrl: string
}
