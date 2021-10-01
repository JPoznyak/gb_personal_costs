<template>
    <div :class="[$style.wrapper]">
      <header>
        <h1>Take a look on your payments and add more!</h1>
      </header> 
    <main>
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
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import Pagination from "../components/Pagination.vue";
import AddPayment from "../components/AddPayment.vue";
// import addCategory from "./components/AddCategory.vue";
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
    name: "Dashboard",
    components: {
        PaymentsDisplay,
        AddPayment,
        // addCategory,
        Pagination
    },
    data: () => ({
    page: '',
    curPage: 1,
    n: 5,
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

    changePage(p){
      this.curPage = p
    },
    addCategory(){
      this.$store.commit('addCategoryToList', this.category)
    },
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
//   padding-top: 20px;
  padding-bottom: 20px;
}
.total {
  padding-top: 20px;
  color: red;
  font-weight: 700;
}
</style>
