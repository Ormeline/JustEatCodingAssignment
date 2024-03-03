<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="allRestaurants.length > 0">
    <div class="container">
      <div class="filters-column">
        <div class="filter-section">
          <img src="@/assets/filters-icon.svg" alt="Filters" class="filters-icon" />
          <h3>Filters</h3>
        </div>
      </div>
      <div class="restaurant-listing">
        <div>
          <h2>{{ allRestaurants.length }} Restaurants in {{ postcode }}</h2>
        </div>
        <div v-if="paginatedRestaurants.length > 0" style="margin-bottom: 20px">
          <button @click="previousPage" :disabled="currentPage <= 1">Previous</button>
          <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
        </div>
        <div
          class="restaurant-item"
          v-for="restaurant in paginatedRestaurants"
          :key="restaurant.id"
        >
          <div><img :src="restaurant.logoUrl" alt="Restaurant Name" /></div>
          <div>
            <h3>{{ restaurant.name }}</h3>
            <div class="ratings">
              <span style="color: #e67e00">★</span> {{ restaurant.rating.starRating }}/5 ({{
                restaurant.rating.count
              }})
            </div>
            <div class="cuisines">
              <p>{{ formatCuisines(restaurant.cuisines) }}</p>
            </div>
            <div class="details">
              <p>{{ formatAddress(restaurant.address) }}</p>
            </div>
          </div>
        </div>
        <div v-if="paginatedRestaurants.length > 0">
          <button @click="previousPage" :disabled="currentPage <= 1">Previous</button>
          <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="allRestaurants.length === 0 && postcode" class="no-results-message">
    No restaurants found. Please try another postcode.
  </div>
  <div v-if="allRestaurants.length === 0 && !postcode" class="no-results-message">
    Please enter a postcode to start searching.
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRestaurantStore } from '@/stores/restaurant'
import type { IRestaurant } from '@/types/restaurant'

const props = defineProps({
  postcode: String
})

const allRestaurants = ref<IRestaurant[]>([])
const error = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const { fetchRestaurants } = useRestaurantStore()

watch(
  () => props.postcode,
  async (newPostcode) => {
    if (newPostcode) {
      try {
        allRestaurants.value = await fetchRestaurants(newPostcode)
        currentPage.value = 1
      } catch (err) {
        error.value = 'Failed to fetch restaurants'
        console.error(err)
      }
    }
  },
  { immediate: true }
)

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

const formatCuisines = (cuisines: { name: string; uniqueName: string }[]) => {
  return cuisines.map((cuisine) => cuisine.name).join(', ')
}

function formatAddress(address: any) {
  const { firstLine, city, postalCode } = address

  if (firstLine || city || postalCode) {
    // Create an array to store the address parts
    const addressParts = []

    // Add each address part to the array if it exists
    if (firstLine) {
      addressParts.push(firstLine)
    }
    if (city) {
      addressParts.push(city)
    }
    if (postalCode) {
      addressParts.push(postalCode)
    }

    // Join the address parts using a comma delimiter
    return addressParts.join(', ')
  } else {
    return 'Address information not available'
  }
}
</script>
