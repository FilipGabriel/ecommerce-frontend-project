<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
      <Transition>
          <div v-if="modal_opened" class="app-modal-backdrop"></div>
      </Transition>

      <Header />
      <RouterView />
  </div>


</template>

<script>
import Header from "@/components/Header.vue";
export default {
    components: { Header },
    data() {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('cart/syncLocalStorage')
    },
    computed: {
        modal_opened() {
            return this.$store.getters['layout/modalOpen']
        }
    },
}
</script>

<style scoped>
.app-modal-backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, .75);
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
