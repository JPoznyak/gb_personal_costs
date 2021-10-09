<template>
  <div id="app">
    <header class="header">
      <router-link to="/dashboard">dashboard</router-link>
      <router-link to="/about">about</router-link>
			<router-link to="/404">notfound</router-link>
    </header>
    <main>
      <router-view />
    </main>
		<transition name="fade">
			<modal-window-add-payment v-bind="modalSettings" v-if="modalSettings.modalIsShow"/>
		</transition>
    <transition name="fade">
      <context-menu />
    </transition>
  </div>
</template>

<script>
import ContextMenu from './components/ContextMenu.vue'
export default {
  name: "App",
  components: {
    ContextMenu,
    ModalWindowAddPayment: () => import('./components/ModalWindowAddPayment.vue')
  },
  data: () => ({
    modalSettings: {
      modalIsShow: false
    }
  }),
  methods: {
    goToPage (pageName) {
      this.$router.push({
        name: pageName
      })
    },
    onShown (settings) {
      this.modalSettings = settings
      this.modalSettings.modalIsShow = true
    },
    onHide () {
      this.modalSettings = {}
      this.modalSettings.modalIsShow = false
    }
  },
  mounted () {
    this.$modal.EventBus.$on('onShown', this.onShown)
    this.$modal.EventBus.$on('onHide', this.onHide)
  },
  created () {
    console.log(this.$modal)
    this.$store.dispatch("fetchData")
    this.$store.dispatch("fetchCategoryList")
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  color: red;
  & a {
    padding-left: 5px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .10s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>