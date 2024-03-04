import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import PostcodeInput from '@/components/PostcodeInput.vue'
import RestaurantList from '@/components/RestaurantList.vue'

describe('HomeView', () => {
  it('renders PostcodeInput and RestaurantList components', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent(PostcodeInput).exists()).toBe(true)
    expect(wrapper.findComponent(RestaurantList).exists()).toBe(true)
  })

  it('passes postcode to RestaurantList and updates it based on PostcodeInput', async () => {
    const wrapper = mount(HomeView)

    await wrapper.findComponent(PostcodeInput).vm.$emit('submit-postcode', 'IG117OG')
    await wrapper.vm.$nextTick() // Wait for update
    const restaurantList = wrapper.findComponent(RestaurantList)
    expect(restaurantList.props('postcode')).toBe('IG117OG')

    await wrapper.findComponent(PostcodeInput).vm.$emit('clear')
    await wrapper.vm.$nextTick() // Wait for update
    expect(restaurantList.props('postcode')).toBe('')
  })
})
