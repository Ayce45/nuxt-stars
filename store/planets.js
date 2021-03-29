export const state = () => ({
  data: [],
})

export const mutations = {
  addPlanets(state, apod) {
    state.data = apod
  },
}

async function fetchPlanets(commit, state) {
  if (!state.data.length) {
    await this.$content('planets')
      .fetch()
      .then((res) => {
        commit('addPlanets', res)
      })
  }
}

export const actions = {
  async getPlanets({ commit, state }) {
    await fetchPlanets.call(this, commit, state)
  },
}
