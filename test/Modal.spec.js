import { mount, shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'

describe('Modal', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Modal, {
      mocks: {
        $store: {
          state: { modal: { visible: true } },
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('Modal is visible', () => {
    const wrapper = shallowMount(Modal, {
      mocks: {
        $store: {
          state: { modal: { visible: true } },
        },
      },
    })
    expect(wrapper.find('button').exists())
  })

  test('Modal is invisible', () => {
    const wrapper = shallowMount(Modal, {
      mocks: {
        $store: {
          state: { modal: { visible: true } },
        },
      },
    })
    expect(!wrapper.find('button').exists())
  })
})
