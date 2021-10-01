<template>
  <div id="app">
     <div :class="[$style.wrapper]">
      <header>
        <h1>My Personal Cost</h1>
      </header> 

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
    <div :class="[$style.content]">
      <add-payment @addNewPayment="addData" />
    </div>
    <div :class="[$style.content]">
    <payments-display show-items :items="currentElements" />
    <div :class="[$style.total]">
      Total: {{TotalAmount}}
    </div>
    </div>
    <div :class="[$style.content]">
      <pagination :cur="curPage" 
                  :n="n" 
                  :length="paymentsList.length" 
                  @paginate="changePage"
      />
    </div>
  </main>
    </div>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import Pagination from "./components/Pagination.vue";
import AddPayment from "./components/AddPayment.vue";
// import addCategory from "./components/AddCategory.vue";
import { mapMutations, mapGetters, mapActions } from 'vuex'

// import Dashboard from "./pages/Dashboard.vue"
// import About from "./pages/About.vue"
// import NotFound from "./pages/NotFound.vue"

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
    // addCategory,
    Pagination
  },

  data: () => ({
    // paymentsList: [],
    page: '',
    curPage: 1,
    n: 5,
    // currentElements: []
  }),

  methods: {
    ...mapMutations({
      addDataToStore: 'addDataToPaymentList'
    }),
     ...mapActions({
      fetchListData: 'fetchData'
     
    }),
    addData(newPayment){
      // this.paymentsList.push(data)
      // this.paymentsList = [...this.paymentsList, data]
      this.addDataToStore(newPayment)
      console.log(newPayment)
    }, 
    showCompletedPaymentForm(){
      this.$router.push({name: "AddPaymentFromUrl"})
    },
    goToPageNotFound() {
      this.$router.push({name: "NotFound"})
    },

    changePage(p){
      this.curPage = p
    },
    addCategory(){
      this.$store.commit('addCategoryToList', this.category)
    },
    // setPage(){
    //   this.page = location.pathname.slice(1)
    // }
  },
  computed: {
    ...mapGetters({
      paymentsList:'getPaymentsList',
      categories: 'getCategoriesList'
    }),
    currentElements(){
      const { n, curPage } = this
      return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n)
    },
    TotalAmount(){
      return this.$store.getters.getPaymentsListTotalAmount
    },
    // // paymentsList(){
    // //   return this.$store.getters.getPaymentList
    // }
  },

  actions: {
    ...mapActions([
      'fetchCategoryList'
    ])
  }, 

  mounted() {
    if (!this.categories.length) {
      this.addCategory()
    }
  }, 

  // created(){
  //   // this.$store.commit('setPaymentsLisrtData', this.fetchData()) // mutations
  //   // this.setPaymentListData(this.fetchData())
  //   // this.$store.dispatch('fetchData') // actions
  //   // this.fetchData()
  //   // this.paymentsList = this.fetchData()
  //  this.fetchListData()
  // }

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
  // padding-bottom: 20px;
}
.total {
  padding-top: 20px;
  color: red;
  font-weight: 700;
}
</style>
