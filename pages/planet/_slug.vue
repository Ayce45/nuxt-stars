<template>
  <main
    class="grid place-items-center min-h-screen p-5"
    :style="{
      background: 'url(' + apod.url + ') no-repeat center center fixed',
    }"
  >
    <p v-if="$fetchState.pending">Fetching the planet....</p>
    <p v-else-if="$fetchState.error">Error while fetching the planet</p>
    <div v-else>
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 mb-5">
        {{ planet().title }}
        <NuxtLink :to="{ name: 'index' }"
          ><svg
            class="mt-5"
            width="24"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.02698 11.9929L5.26242 16.2426L6.67902 14.8308L4.85766 13.0033L22.9731 13.0012L22.9728 11.0012L4.85309 11.0033L6.6886 9.17398L5.27677 7.75739L1.02698 11.9929Z"
              fill="currentColor"
            /></svg
        ></NuxtLink>
      </h1>
      <section class="grid grid-cols-1">
        <div class="bg-gray-900 shadow-lg rounded p-3">
          <div class="relative bg-[#030305] h-screen flex">
            <img
              class="block rounded m-auto p-5"
              :style="{ width: getSize() }"
              :src="planet().image"
              alt=""
            />
          </div>
          <div class="p-5">
            <h3 class="text-white text-lg">{{ planet().title }}</h3>
            <p class="text-gray-400 description">{{ planet().description }}</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      planets: {},
      apod: [],
    }
  },
  async fetch() {
    this.planets = await this.$content('planets').fetch()
    this.apod = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=dAgZIz2a6coyDBWHXT3By2hRD0zYSRbwmgRtXBtT'
    ).then((res) => res.json())
  },
  methods: {
    getSize() {
      const raduis = this.raduisToNumber(this.planet().radius) * 100
      const max = Math.max(
        ...this.planets.map((a) => this.raduisToNumber(a.radius))
      )
      return Math.round(raduis / max) + 'vh'
    },
    raduisToNumber(raduis) {
      if (raduis !== undefined)
        return Number(raduis.split(' ')[0].split(',').join(''))
    },
    planet() {
      return this.planets.find(
        (planet) => planet.slug === this.$route.params.slug
      )
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  background-size: cover !important;
}
</style>
