import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PostcodeInput from '@/components/PostcodeInput.vue'

describe('PostcodeInput', () => {
  it('renders correctly', () => {
    const wrapper = mount(PostcodeInput)
    expect(wrapper.text()).toContain('Find Restaurants')
    expect(wrapper.text()).toContain('Clear')
  })

  it('emits submit-postcode on find restaurants button click', async () => {
    const wrapper = mount(PostcodeInput)
    const input = wrapper.find('input')
    await input.setValue('IG11 7OG')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('submit-postcode')
  })

  it('clears the input and emits submit-postcode on clear button click', async () => {
    const wrapper = mount(PostcodeInput)
    const input = wrapper.find('input')
    await input.setValue('AB1 2CD')
    await wrapper.findAll('button')[1].trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.emitted()).toHaveProperty('submit-postcode')
  })

  it('validates and cleans the postcode', () => {
    const wrapper = mount(PostcodeInput)
    const componentInstance: any = wrapper.vm

    const alertMock = vi.fn()
    global.alert = alertMock

    expect(componentInstance.validateAndCleanPostcode('AB1 2CD')).toBe('AB12CD')
    expect(componentInstance.validateAndCleanPostcode('invalid!')).toBeNull()
    expect(global.alert).toHaveBeenCalled()
  })
})
