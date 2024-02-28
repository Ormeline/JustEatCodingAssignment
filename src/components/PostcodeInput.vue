<template>
  <div class="restaurant-search">
    <button @click="submitPostcode">Find Restaurants in SE1 9QU.</button>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="restaurants.length > 0">
      <h2>Restaurants in SE1 9QU:</h2>
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          {{ restaurant.name }}
        </li>
      </ul>
    </div>
    <p v-else>No restaurants found for SE1 9QU.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRestaurantStore } from '@/stores/restaurantStore'

const restaurants = ref([])
const error = ref('')
const { fetchRestaurants } = useRestaurantStore()

const submitPostcode = async () => {
  try {
    restaurants.value = await fetchRestaurants()
  } catch (err) {
    error.value = 'Failed to fetch restaurants'
    console.error(err)
  }
}
</script>
