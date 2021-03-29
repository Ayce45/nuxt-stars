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
      <div>
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
          <div
            class="ml-5 relative text-gray-600 focus-within:text-gray-400 w-32"
          >
            <vue-slider v-model="value" :min="3388" :max="69911"></vue-slider>
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
      search: '',
      value: [3388, 69911],
    }
  },
  async fetch() {
    await this.$store.dispatch('planets/getPlanets')
    await this.$store.dispatch('apod/getApod')
  },
  computed: {
    modalVisibility() {
      return this.$store.state.modal.visible
    },
    apod() {
      return this.$store.state.apod.data
    },
    planets() {
      return this.$store.state.planets.data
    },
    filteredPlanets() {
      if (this.search !== '')
        return this.planets
          .filter((a) => a.slug.includes(this.search.toLocaleLowerCase()))
          .filter((a) => {
            return (
              this.raduisToNumber(a.radius) >= this.value[0] &&
              this.raduisToNumber(a.radius) <= this.value[1]
            )
          })
      else
        return this.planets.filter((a) => {
          return (
            this.raduisToNumber(a.radius) >= this.value[0] &&
            this.raduisToNumber(a.radius) <= this.value[1]
          )
        })
    },
  },
  methods: {
    raduisToNumber(raduis) {
      if (raduis !== undefined)
        return Number(raduis.split(' ')[0].split(',').join(''))
    },
  },
}
</script>

<style>
.vue-slider-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* rail style */
.vue-slider-rail {
  background-color: #ccc;
  border-radius: 15px;
}

/* process style */
.vue-slider-process {
  background-color: #111827;
  border-radius: 15px;
}

/* mark style */
.vue-slider-mark {
  z-index: 4;
}

.vue-slider-mark-step .vue-slider-mark:first-child,
.vue-slider-mark-step .vue-slider-mark:last-child {
  display: none;
}

.vue-slider-mark-step {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.16);
}

.vue-slider-mark-label {
  font-size: 14px;
  white-space: nowrap;
}

/* dot style */
.vue-slider-dot-handle {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
}

.vue-slider-dot-handle-focus {
  box-shadow: 0 0 1px 2px rgba(52, 152, 219, 0.36);
}

.vue-slider-dot-handle-disabled {
  cursor: not-allowed;
  background-color: #ccc;
}

.vue-slider-dot-tooltip-inner {
  font-size: 14px;
  white-space: nowrap;
  padding: 2px 5px;
  min-width: 20px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  border-color: #111827;
  background-color: #111827;
  box-sizing: content-box;
}

.vue-slider-dot-tooltip-inner::after {
  content: '';
  position: absolute;
}

.vue-slider-dot-tooltip-inner-top::after {
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-top-color: inherit;
}

.vue-slider-dot-tooltip-inner-bottom::after {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-bottom-color: inherit;
}

.vue-slider-dot-tooltip-inner-left::after {
  left: 100%;
  top: 50%;
  transform: translate(0, -50%);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-left-color: inherit;
}

.vue-slider-dot-tooltip-inner-right::after {
  right: 100%;
  top: 50%;
  transform: translate(0, -50%);
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px;
  border-right-color: inherit;
}

.vue-slider-dot-tooltip-wrapper {
  opacity: 0;
  transition: all 0.3s;
}

.vue-slider-dot-tooltip-wrapper-show {
  opacity: 1;
}
</style>
