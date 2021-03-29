export const state = () => ({
  data: [],
})

export const mutations = {
  addApod(state, apod) {
    state.data = apod
  },
}

async function fetchApod(commit, state) {
  if (!state.data.length) {
    await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=dAgZIz2a6coyDBWHXT3By2hRD0zYSRbwmgRtXBtT'
    )
      .then((res) => res.json())
      .then((res) => {
        commit('addApod', res)
      })
  }
}

export const actions = {
  async getApod({ commit, state }) {
    await fetchApod.call(this, commit, state)
  },
}
