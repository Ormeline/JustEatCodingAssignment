<template>
  <div class="restaurant-search">
    <input type="text" v-model="postcode" placeholder="Enter postcode" />
    <button @click="submitPostcode">Find Restaurants</button>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="paginatedRestaurants.length > 0">
      <h2>{{ allRestaurants.length }} Restaurants in {{ postcode }}:</h2>
      <ul>
        <li v-for="restaurant in paginatedRestaurants" :key="restaurant.id">
          {{ restaurant.name }}
          <p>Cuisines: {{ restaurant.cuisines.map((cuisine) => cuisine.name).join(', ') }}</p>
          <p>Rating: {{ restaurant.rating.starRating }} ({{ restaurant.rating.count }} Reviews)</p>
          <p>
            Address: {{ restaurant.address.firstLine }}, {{ restaurant.address.postalCode }},
            {{ restaurant.address.city }}
          </p>
        </li>
      </ul>
      <button @click="previousPage" :disabled="currentPage <= 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
    <p v-else>No restaurants found in {{ postcode }}.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRestaurantStore } from '@/stores/restaurant'
import type { IRestaurant } from '@/types/restaurant'

const postcode = ref('')
const allRestaurants = ref<IRestaurant[]>([])
const error = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const { fetchRestaurants } = useRestaurantStore()

const submitPostcode = async () => {
  try {
    allRestaurants.value = await fetchRestaurants(postcode.value)
    currentPage.value = 1 // Reset to first page on new search
  } catch (err) {
    error.value = 'Failed to fetch restaurants'
    console.error(err)
  }
}

const paginatedRestaurants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allRestaurants.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(allRestaurants.value.length / itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>
