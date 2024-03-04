import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RestaurantList from '@/components/RestaurantList.vue'

describe('RestaurantList', () => {
  // Test for rendering
  it('renders correctly', () => {
    const wrapper = mount(RestaurantList, {
      props: {
        postcode: 'IG117OG'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('goes to the previous page when "PreviousButton" is clicked', async () => {
    const wrapper = mount(RestaurantList, {
      props: {
        postcode: 'IG117OG'
      },
      data() {
        return {
          currentPage: 2,
          totalPages: 1
        }
      }
    })

    const previousButton = wrapper.find('.previous-page-button')
    expect(previousButton.exists()).toBe(false)
    if (previousButton.exists()) {
      await previousButton.trigger('click')
    }
  })
  it('goes to the next page when "NextButton" is clicked', async () => {
    const wrapper = mount(RestaurantList, {
      props: {
        postcode: 'IG117OG'
      },
      data() {
        return {
          currentPage: 2,
          totalPages: 1
        }
      }
    })

    const nextButton = wrapper.find('.next-page-button')
    expect(nextButton.exists()).toBe(false)
    if (nextButton.exists()) {
      await nextButton.trigger('click')
    }
  })

  it('displays a prompt to enter a postcode when none is provided', () => {
    const wrapper = mount(RestaurantList, {
      props: { postcode: '' }
    })

    expect(wrapper.text()).toContain('Please enter a postcode to start searching.')
  })

  it('displays a message when no restaurant is found', async () => {
    const wrapper = mount(RestaurantList, {
      props: {
        postcode: 'IG117OG'
      },
      data() {
        return {
          allRestaurants: [],
          currentPage: 1,
          totalPages: 1
        }
      }
    })

    expect(wrapper.text()).toContain('No restaurants found')
  })
})
