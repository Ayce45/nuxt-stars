<template>
  <div
    v-if="modalVisibility"
    class="h-screen w-full fixed flex items-center justify-center bg-modal z-10"
  >
    <div
      class="bg-white rounded shadow p-8 m-4 max-w-lg max-h-full text-center"
    >
      <div class="mb-4">
        <h1
          class="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-600 mb-5"
        >
          Welcome!
        </h1>
      </div>
      <div class="mb-8">
        <ul class="text-gray-400">
          <li>🔙 APOD for background</li>
          <li>🧠 Search input</li>
          <li>💖 Store for love</li>
          <li>💄 Tailwind for css</li>
          <li>🪐 Images size by planet size</li>
          <li>🧪 Jest for test</li>
        </ul>
      </div>
      <div class="flex justify-center">
        <button
          class="flex-no-shrink text-white py-2 px-4 rounded bg-green-400 hover:bg-green-600 transition-all"
          @click="$store.commit('modal/hide')"
        >
          Let's Go
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  computed: {
    modalVisibility() {
      return this.$store.state.modal.visible
    },
  },
}
</script>
