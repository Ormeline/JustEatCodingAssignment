<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="allRestaurants.length > 0">
    <div class="container">
      <div class="filters-column">
        <div class="filter-section">
          <div class="filter-heading">
            <img src="@/assets/filters-icon.svg" alt="Filters" class="filters-icon" />
            <h3>Filters</h3>
          </div>
          <div><button @click="clearFilters" class="filter-button">Clear Filters</button></div>
          <div class="filter-options">
            <div v-for="(filter, key) in filters" :key="key" class="filter-option">
              <input type="checkbox" :id="`filter-${key}`" v-model="selectedFilters" :value="key" />
              <label :for="`filter-${key}`">{{ filter.displayName }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="restaurant-listing">
        <div>
          <h2>{{ filteredRestaurants.length }} Restaurants in {{ postcode }}</h2>
        </div>
        <div class="navigation-container">
          <div>Page {{ currentPage }} of {{ totalPages }}</div>
          <div v-if="paginatedRestaurants.length > 0">
            <button class="prev-button" @click="previousPage" :disabled="currentPage <= 1">
              Previous
            </button>
            <button class="next-button" @click="nextPage" :disabled="currentPage >= totalPages">
              Next
            </button>
          </div>
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
            <div class="opening-time">
              <p v-if="isRestaurantOpen(restaurant.deliveryOpeningTimeLocal)">
                Delivery time is between {{ restaurant.deliveryEtaMinutes.rangeLower }} and
                {{ restaurant.deliveryEtaMinutes.rangeUpper }} minutes
              </p>
              <p v-else>
                Currently closed. Opens at
                {{ moment(restaurant.deliveryOpeningTimeLocal).format('MMMM Do YYYY, h:mm:ss a') }}
              </p>
            </div>
          </div>
        </div>
        <div class="navigation-container">
          <div>Page {{ currentPage }} of {{ totalPages }}</div>
          <div v-if="paginatedRestaurants.length > 0">
            <button class="prev-button" @click="previousPage" :disabled="currentPage <= 1">
              Previous
            </button>
            <button class="next-button" @click="nextPage" :disabled="currentPage >= totalPages">
              Next
            </button>
          </div>
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
import moment from 'moment'
import { useRestaurantStore } from '@/stores/restaurant'
import type { IRestaurant } from '@/types/restaurant'
import type { IFilters } from '@/types/filter'

const props = defineProps({
  postcode: String
})

const allRestaurants = ref<IRestaurant[]>([])
const filters = ref<IFilters>({})
const selectedFilters = ref<string[]>([])
const error = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const { fetchRestaurantsAndFilters } = useRestaurantStore()

watch(
  () => props.postcode,
  async (newPostcode) => {
    if (newPostcode) {
      try {
        const { restaurants, filters: fetchedFilters } =
          await fetchRestaurantsAndFilters(newPostcode)
        allRestaurants.value = restaurants
        filters.value = fetchedFilters
        currentPage.value = 1
      } catch (err) {
        error.value = 'Failed to fetch restaurants'
        console.error(err)
      }
    } else {
      allRestaurants.value = []
      filters.value = {}
    }
  },
  { immediate: true }
)

const filteredRestaurants = computed(() => {
  if (selectedFilters.value.length === 0) {
    return allRestaurants.value
  }
  return allRestaurants.value.filter((restaurant) =>
    selectedFilters.value.some((filterKey) =>
      filters.value[filterKey]?.restaurantIds.includes(restaurant.id)
    )
  )
})

const paginatedRestaurants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredRestaurants.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRestaurants.value.length / itemsPerPage)
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

const clearFilters = () => {
  selectedFilters.value = []
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

const isRestaurantOpen = (openingTimeLocal: string): boolean => {
  const currentTime = new Date()
  const openingTime = new Date(openingTimeLocal)
  return openingTime.getTime() < currentTime.getTime()
}
</script>
