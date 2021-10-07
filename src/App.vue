<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <div :class="[$style.menu]">
        <router-link to='/dashboard'>Dashboard</router-link> /
        <router-link to='/about'>About</router-link> / 
        <router-link to='/notfound'>NotFound</router-link> / 
        <button @click="showCompletedPaymentForm">New Payment</button>
      </div>
    <main>
      <div :class="[$style.content]">
        <router-view />
      </div>    
    </main>
    <transition name="fade">
			<modal-window-add-payment v-bind="modalSettings" v-if="modalSettings.modalShown"/>
		</transition>
  </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    ModalWindowAddPayment: () => import('./components/ModalWindowAddPayment.vue')
  },
  data: () => ({
    modalSettings: {
      modalShown: false
    }
  }),

  methods: {
    showCompletedPaymentForm(){
      this.$router.push({name: "AddPaymentFromUrl"})
    },
    goToPageNotFound() {
      this.$router.push({name: "NotFound"})
    },
    onShow(settings){
      this.modalSettings = settings
      this.modalShown = true
    },
    onHide(){
      this.modalShown = false
      this.modalSettings = {}
    }
  },

  mounted () {
    this.$modal.EventBus.$on('onShown', this.onShown)
    this.$modal.EventBus.$on('onHide', this.onHide)
  },
  beforeDestroy(){
    this.$modal.EventBus.$off('show', this.onShow)
    this.$modal.EventBus.$off('hide', this.onHide)
  },

  created () {
    this.$store.dispatch("fetchData")
    this.$store.dispatch("fetchCategoryList")
  }

}
</script>

<style lang="scss" module>
.wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: block;
  height: 100%
}
.content {
  padding-top: 20px;
}
</style>
