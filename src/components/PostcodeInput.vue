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

const emitSubmitPostcode = () => {
  emit('submit-postcode', postcode.value)
}

const emitClearPostcode = () => {
  postcode.value = ''
  emit('submit-postcode', '')
}
</script>
