export const state = () => ({
  visible: true,
})

export const mutations = {
  hide(state) {
    state.visible = false
  },
}
