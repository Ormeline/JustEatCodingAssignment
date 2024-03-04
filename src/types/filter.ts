export interface IFilter {
  displayName: string
  imageName: string
  group: string
  restaurantIds: string[]
}

export interface IFilters {
  [key: string]: IFilter
}
