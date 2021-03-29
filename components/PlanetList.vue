<template>
  <section
    v-if="filteredPlanets.length"
    class="grid grid-cols-1 sm:grid-cols-3 gap-4 m-5"
  >
    <div
      v-for="planet in filteredPlanets"
      :key="planet.slug"
      class="bg-gray-900 shadow-lg rounded p-3"
    >
      <div class="group relative">
        <img class="w-full block rounded" :src="planet.image" alt="" />
        <div class="card-navigation">
          <button
            v-if="existLove(planet.slug)"
            class="button"
            @click="removeLove(planet.slug)"
          >
            <icon-love />
          </button>
          <button v-else class="button" @click="addLove(planet.slug)">
            <icon-un-love />
          </button>

          <NuxtLink
            :to="{ name: 'planet-slug', params: { slug: planet.slug } }"
            class="button"
          >
            <icon-play />
          </NuxtLink>
          <button class="has-tooltip button">
            <span
              class="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8"
              >{{ planet.distanceFromSun }}</span
            >
            <icon-sun />
          </button>
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-white text-lg">
          {{ planet.title }}
        </h3>
        <p class="text-gray-400 description">
          {{ planet.description }}
        </p>
      </div>
    </div>
  </section>
  <p v-else class="dark:text-white text-black">No planet 😭</p>
</template>

<script>
export default {
  name: 'PlanetList',
  props: {
    filteredPlanets: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addLove(slug) {
      this.$store.commit('love/add', slug)
      this.$popup(this.popupMessage('Love added ❤️'))
    },
    popupMessage(message) {
      return {
        message,
        color: '#34d399',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        delay: 1,
        fontSize: 60,
      }
    },
    removeLove(slug) {
      this.$store.commit('love/remove', slug)
      this.$popup(this.popupMessage('Love remove 💔'))
    },
    existLove(slug) {
      return (
        this.$store.state.love.list.find((planet) => planet.slug === slug) !==
        undefined
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.card-navigation {
  @apply absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly;
}

.button {
  @apply hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition;
}
</style>
