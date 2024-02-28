<template>
  <div class="restaurant-search">
    <button @click="submitPostcode">Find Restaurants in IG11 7EG</button>

    <div v-if="restaurants.length > 0">
      <h2>Restaurants In IG11 7EG:</h2>
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          {{ restaurant.name }}
        </li>
      </ul>
    </div>
    <p v-else>No restaurants found for postcode IG11 7EG.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRestaurantStore } from '@/stores/restaurantStore'

const { fetchRestaurants } = useRestaurantStore()
const restaurants = ref([])

const submitPostcode = async () => {
  restaurants.value = await fetchRestaurants()
}
</script>
