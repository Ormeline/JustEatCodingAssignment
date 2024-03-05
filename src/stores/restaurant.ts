/**
 * This file contains the `useRestaurantStore` hook for fetching restaurant data and filters from the Just Eat API.
 * It uses a CORS proxy for API requests and handles both successful responses and errors.
 * The main functionality is provided by the `fetchRestaurantsAndFilters` function, which fetches data based on a postcode.
 * Data conforms to `IRestaurant` and `IFilters` interfaces, ensuring type safety.
 * If there's errors, it logs them and returns default empty values.
 */

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
