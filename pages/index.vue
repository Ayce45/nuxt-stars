<template>
  <main
    class="grid min-h-screen"
    :style="{
      background: 'url(' + apod.url + ') no-repeat center center fixed',
    }"
  >
    <Modal />
    <div
      :class="{
        'opacity-0': modalVisibility,
      }"
    >
      <p v-if="$fetchState.pending" class="dark:text-white text-black absolute">
        Fetching planets....
      </p>
      <p
        v-else-if="$fetchState.error"
        class="dark:text-white text-black absolute"
      >
        Error while fetching planets
      </p>
      <div v-else>
        <div class="flex items-center">
          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 mb-5 ml-5"
          >
            Planets
          </h1>
          <div class="ml-5 relative text-gray-600 focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                class="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <label>
              <input
                v-model="search"
                type="search"
                name="q"
                class="py-2 text-sm text-white bg-gray-900 shadow-lg rounded pl-10"
                placeholder="Search..."
                autocomplete="off"
              />
            </label>
          </div>
        </div>
        <PlanetList :filtered-planets="filteredPlanets" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      planets: [],
      search: '',
    }
  },
  async fetch() {
    this.planets = await this.$content('planets').fetch()
    await this.$store.dispatch('apod/getApod')
  },
  computed: {
    modalVisibility() {
      return this.$store.state.modal.visible
    },
    apod() {
      return this.$store.state.apod.data
    },
    filteredPlanets() {
      if (this.search !== '')
        return this.planets.filter((a) =>
          a.slug.includes(this.search.toLocaleLowerCase())
        )
      else return this.planets
    },
  },
  mounted() {
    console.log(process.env)
  },
}
</script>
