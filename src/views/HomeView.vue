<template>
  <PostcodeInput @submit-postcode="updatePostcode" :postcode="postcode" @clear="clearPostcode" />
  <div v-if="!postcode"></div>
  <RestaurantList :postcode="postcode" />
</template>

<script setup lang="ts">
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
