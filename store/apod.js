export const state = () => ({
  data: [],
})

export const mutations = {
  addApod(state, apod) {
    state.data = apod
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=dAgZIz2a6coyDBWHXT3By2hRD0zYSRbwmgRtXBtT'
    ).then((res) => commit('addApod', res.json()))
  },
}
