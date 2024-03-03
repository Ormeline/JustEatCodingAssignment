export const useRestaurantStore = () => {
  const fetchRestaurants = async (postcode: string) => {
    try {
      const apiUrl = `https://corsproxy.io/?${encodeURIComponent(
        `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
      )}`
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      return data.restaurants
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
      return []
    }
  }

  return {
    fetchRestaurants
  }
}
