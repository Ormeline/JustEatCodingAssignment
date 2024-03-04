import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PostcodeInput from '@/components/PostcodeInput.vue'

describe('PostcodeInput', () => {
  // Test for rendering
  it('renders correctly', () => {
    const wrapper = mount(PostcodeInput)
    expect(wrapper.text()).toContain('Find Restaurants')
    expect(wrapper.text()).toContain('Clear')
  })

  // Test for button click
  it('emits submit-postcode on find restaurants button click', async () => {
    const wrapper = mount(PostcodeInput)
    const input = wrapper.find('input')
    await input.setValue('IG11 7OG') // Enter a valid postcode
    await wrapper.find('button').trigger('click') // Trigger button click
    expect(wrapper.emitted()).toHaveProperty('submit-postcode')
  })

  // Test for clear button
  it('clears the input and emits submit-postcode on clear button click', async () => {
    const wrapper = mount(PostcodeInput)
    const input = wrapper.find('input')
    await input.setValue('AB1 2CD')
    await wrapper.findAll('button')[1].trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.emitted()).toHaveProperty('submit-postcode')
  })

  // Test validateAndCleanPostcode function
  it('validates and cleans the postcode', () => {
    const wrapper = mount(PostcodeInput)
    const componentInstance: any = wrapper.vm

    // Replace 'alert' with a mock function to avoid actual alerts during tests
    const alertMock = vi.fn()
    global.alert = alertMock

    expect(componentInstance.validateAndCleanPostcode('AB1 2CD')).toBe('AB12CD')
    expect(componentInstance.validateAndCleanPostcode('invalid!')).toBeNull()
    expect(global.alert).toHaveBeenCalled()
  })
})
