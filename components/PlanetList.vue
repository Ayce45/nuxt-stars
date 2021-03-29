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
        <div
          class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"
        >
          <button
            v-if="existLove(planet.slug)"
            class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            @click="removeLove(planet.slug)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </button>
          <button
            v-else
            class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            @click="addLove(planet.slug)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
          </button>

          <NuxtLink
            :to="{ name: 'planet-slug', params: { slug: planet.slug } }"
            class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
              />
            </svg>
          </NuxtLink>
          <button
            class="has-tooltip hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <span
              class="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8"
              >{{ planet.distanceFromSun }}</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-sun-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
              />
            </svg>
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
</style>
