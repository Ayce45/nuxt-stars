export const state = () => ({
  list: [],
})

export const mutations = {
  add(state, slug) {
    state.list.push({
      slug,
    })
  },
  remove(state, slug) {
    const index = state.list.findIndex((c) => c.slug === slug)
    state.list.splice(index, 1)
  },
}
