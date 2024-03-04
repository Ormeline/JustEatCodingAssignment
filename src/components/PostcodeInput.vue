<template>
  <div class="header postcode-lookup">
    <img alt="JustEat logo" src="@/assets/logo.svg" />
    <div>
      <input type="text" v-model="postcode" placeholder="Enter postcode" />
      <button @click="emitSubmitPostcode">Find Restaurants</button>
      <button @click="emitClearPostcode" style="margin-left: 10px">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const postcode = ref('')
const emit = defineEmits(['submit-postcode'])

const validateAndCleanPostcode = (postcode: string) => {
  // Remove non-alphanumeric characters and spaces
  const cleanedPostcode = postcode.replace(/[^a-zA-Z0-9]/g, '')

  // Regular expression for basic UK postcode validation
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i

  if (ukPostcodeRegex.test(cleanedPostcode.toUpperCase())) {
    return cleanedPostcode.toUpperCase()
  } else {
    alert('Please enter a valid UK postcode.')
    return null
  }
}

const emitSubmitPostcode = () => {
  const validPostcode = validateAndCleanPostcode(postcode.value)
  if (validPostcode) {
    emit('submit-postcode', validPostcode)
  }
}

const emitClearPostcode = () => {
  postcode.value = ''
  emit('submit-postcode', '')
}
</script>
