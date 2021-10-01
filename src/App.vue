<template>
  <div id="app">
     <div :class="[$style.wrapper]">
     
    <div :class="[$style.menu]">
      <router-link to='/dashboard'>Dashboard</router-link> /
      <router-link to='/about'>About</router-link> / 
      <!-- <router-link to='/notfound'>NotFound</router-link> /  -->
      <button @click="goToPageNotFound">NotFound</button> /
      <!-- <a href="dashboard">Dashboard</a> /
      <a href="about">About</a> / 
      <a href="notfound">About</a> /  -->
      <!-- <router-link to='/add/payment/Food?value=200'>New Payment</router-link> / -->
      <button @click="showCompletedPaymentForm">New Payment</button>
    </div>
  <main>
  <div :class="[$style.content]">
      <!-- <About v-if="page === 'about'"/>
      <Dashboard v-if="page === 'dashboard'"/> -->
      <!-- <NotFound v-if="page === 'notfound'"/>  -->
    <router-view />
   </div>    
  </main>
  </div>
  </div>
</template>

<script>

export default {
  name: "App",
  
  data: () => ({
   
  }),

  methods: {
    showCompletedPaymentForm(){
      this.$router.push({name: "AddPaymentFromUrl"})
    },
    goToPageNotFound() {
      this.$router.push({name: "NotFound"})
    },
  },

  created () {
    this.page = Number(this.$route.params.page)
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
