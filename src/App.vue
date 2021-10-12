<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <div :class="[$style.menu]">
        <router-link to="/dashboard">Dashboard</router-link>/
        <router-link to="/about">About</router-link>/
        <button @click="goToPageNotFound">NotFound</button>
      </div>
      <main>
        <div :class="[$style.content]">
          <!-- <About v-if="page === 'about'"/>
          <Dashboard v-if="page === 'dashboard'"/>-->
          <!-- <NotFound v-if="page === 'notfound'"/>  -->
          <router-view />
        </div>
      </main>
      <transition name="fade">
        <modal-window-add-payment v-bind="modalSettings" v-if="modalSettings.modalIsShown" />
      </transition>
      <transition name="fade">
        <context-menu />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    ContextMenu: () => import("./components/ContextMenu.vue"),
    ModalWindowAddPayment: () =>
      import("./components/ModalWindowAddPayment.vue")
  },
  data: () => ({
    modalSettings: {
      modalIsShown: false
    }
  }),
  methods: {
    // goToPage (pageName) {
    //   this.$router.push({
    //     name: pageName
    //   })
    // },
    goToPageNotFound() {
      this.$router.push({ name: "NotFound" });
    },

    onShow(settings) {
      this.modalSettings = settings;
      this.modalSettings.modalIsShown = true;
    },
    onHide() {
      this.modalSettings = {};
      this.modalSettings.modalIsShown = false;
    }
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
  // created() {
  //   console.log(this.$modal);
  //   this.$store.dispatch("fetchData");
  //   this.$store.dispatch("fetchCategoryList");
  // }
};
</script>

<style lang="scss" module>
.wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu {
  & a {
    padding-left: 10px;
  }
}
.content {
  padding-top: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>