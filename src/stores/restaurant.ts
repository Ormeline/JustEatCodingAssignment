import type { IRestaurant } from '@/types/restaurant'
import type { IFilters } from '../types/filter'

export const useRestaurantStore = () => {
  const fetchRestaurantsAndFilters = async (postcode: string) => {
    try {
      const apiUrl = `https://corsproxy.io/?${encodeURIComponent(
        `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
      )}`
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      return {
        restaurants: data.restaurants as IRestaurant[],
        filters: data.filters as IFilters
      }
    } catch (error) {
      console.error('Failed to fetch restaurants and filters:', error)
      return { restaurants: [], filters: {} }
    }
  }

  return {
    fetchRestaurantsAndFilters
  }
}
