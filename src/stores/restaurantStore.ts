export const useRestaurantStore = () => {
    // Define the fetchRestaurants method
    const fetchRestaurants = async () => {
        const apiUrl = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/IG117EG`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data; // This should return a list of restaurants or the response data
    };

    return {
        fetchRestaurants,
    };
};