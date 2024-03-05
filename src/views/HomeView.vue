<template>
  <!-- 
    Main Component:
    - Integrates PostcodeInput and RestaurantList components.
    - Manages and passes postcode data between components.
    - Conditionally renders RestaurantList based on postcode availability.
  -->
  <!-- Postcode input component with event handling for submitting and clearing postcode -->
  <!-- Conditional rendering placeholder for when no postcode is entered -->
  <!-- Restaurant list component, displayed when a postcode is available -->

  <PostcodeInput @submit-postcode="updatePostcode" :postcode="postcode" @clear="clearPostcode" />
  <div v-if="!postcode"></div>
  <RestaurantList :postcode="postcode" />
</template>

<script setup lang="ts">
/** Script Description:
   - Handles the state and logic for the main component of the application.
   - Uses Vue reactivity to manage the postcode state.
   - Defines methods for updating and clearing the postcode.

  This component has a reactive state for storing and tracking postcode.
  It uses function to update the postcode value based on user input and a function to
  clear the current postcode value.
*/

import { ref } from 'vue'
import PostcodeInput from '@/components/PostcodeInput.vue'
import RestaurantList from '@/components/RestaurantList.vue'

const postcode = ref('')

const updatePostcode = (newPostcode: string) => {
  postcode.value = newPostcode
}

const clearPostcode = () => {
  postcode.value = ''
}
</script>
