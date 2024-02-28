export const useRestaurantStore = () => {
  const fetchRestaurants = async () => {
    try {
      const apiUrl =
        'https://corsproxy.io/?' +
        encodeURIComponent(
          'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/SE19QU'
        )
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
