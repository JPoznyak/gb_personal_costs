<!-- // <template>
//     <div :class="[$style.wrapper]">
//       <header>
//         <h1>Take a look on your payments and add more!</h1>
//       </header> 
//     <main>
//         <div :class="[$style.content]">
//             <add-payment @addNewPayment="addData" />
//         </div>
//         <div :class="[$style.content]">
//             <payments-display show-items :items="currentElements" />
//             <div :class="[$style.total]">
//                 Total: {{TotalAmount}}
//             </div>
//         </div>
//         <div :class="[$style.content]">
//             <pagination :cur="curPage" 
//                         :n="n" 
//                         :length="paymentsList.length" 
//                         @paginate="changePage"
//             />
//         </div> 

//         <div :class="[$style.content]">
//             <modal-window-add-payment @close="onModalClose" v-if="modalIsShow"/>
//             <button @click="modalIsShow = true">Add Payment</button>
//         </div>
//         <button @click="addPayment">Add Payment</button>
//     </main>  
//     </div>
// </template>

// <script>
// import { mapMutations, mapGetters } from "vuex";

// export default {
//     name: "Dashboard",
//     components: {
//         AddPayment: () => import('../AddPayment.vue'),
//         PaymentsDisplay: () => import('../components/PaymentsDisplay.vue'),
//         // addCategory,
//         Pagination: () => import('../components/Pagination.vue'),
//         ModalWindowAddPayment: () => import("../components/ModalWindowAddPayment.vue")
//     },
//     data: () => ({
//         modalIsShow: false,
//         page: '',
//         curPage: 1,
//         n: 5,
//     }),

// //   methods: {
// //     ...mapMutations({
// //       addDataToStore: 'addDataToPaymentList'
// //     }),
// //      ...mapActions({
// //       fetchListData: 'fetchData'
     
// //     }),
// //     addData(newPayment){
// //       // this.paymentsList.push(data)
// //       // this.paymentsList = [...this.paymentsList, data]
// //       this.addDataToStore(newPayment)
// //       console.log(newPayment)
// //     }, 
// //     changePage (p) {
// //       this.page = p
// //       this.$store.dispatch('fetchData', p)
// //     },
// //     // changePage(p){
// //     //   this.curPage = p
// //     // },
// //     addCategory(){
// //       this.$store.commit('addCategoryToList', this.category)
// //     },
// //     onModalClose(){
// //         this.modalIsShow = false
// //     }
// //   },

// methods: {
//     ...mapMutations({
//       addData: 'setPaymentsListData'
//     }),
//     changePage (p) {
//       this.page = p
//       this.$store.dispatch('fetchData', p)
//     },
//     addPayment () {
//       this.$modal.show({ title: 'Add Payment Form', content: 'AddPayment' })
//     }
//   },

//   computed: {
//     ...mapGetters({
//       paymentsList:'getPaymentsList',
//       categories: 'getCategoriesList'
//     }),
//     currentElements(){
//       const { n, curPage } = this
//       return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n)
//     },
//     TotalAmount(){
//       return this.$store.getters.getPaymentsListTotalAmount
//     },
//     paymentsList(){
//        return this.$store.getters.getPaymentsList
//     }
//   },

//   created () {
//     if (this.$route.params?.page) {
//       this.page = Number(this.$route.params.page)
//     }
//     this.$store.dispatch('fetchData', 1)
//     this.$store.dispatch('fetchCategoryList')
//   },

// //   actions: {
// //     ...mapActions([
// //       'fetchCategoryList'
// //     ])
// //   }, 

// //   mounted() {
// //     if (!this.categories.length) {
// //       this.addCategory()
// //     }
// //   }, 
  
// }
// </script>

// <style lang="scss" module>
// .wrapper {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   display: block;
//   height: 100%
// }
// .content {
//   padding-bottom: 20px;
// }
// .total {
//   padding-top: 20px;
//   color: red;
//   font-weight: 700;
// }
// </style> -->

<template>
  <div>
    Total Price : {{ getFPV }}
    <PaymentDisplay show-items :items="currentElements" />
    <router-link to="/dashboard/add/payment/Sport?value=400">
      Sport400</router-link
    >
    /

    <router-link to="/dashboard/add/payment/Education?value=500">
      Education500</router-link
    >
    /

    <router-link to="/dashboard/add/payment/Transport?value=600">
      Transport600</router-link
    >

    <pagination
      :cur="page"
      :n="n"
      :length="paymentsList.length"
      @paginate="changePage"
    />
    <button @click="addPayment">add</button>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue"
import PaymentDisplay from "../components/PaymentDisplay.vue"
import { mapMutations, mapGetters } from "vuex"
export default {
  components: { PaymentDisplay, Pagination },
  name: "Dashboard",
  data: () => ({
    page: 1,
    n: 10
  }),
  watch: {
    $route (to, from) {
      if (to.name === "AddPaymentFromUrl") {
        this.checkUrl()
      }
    }
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
    getFPV () {
      return this.$store.getters.getPaymentsListFullPrice
    },
    paymentsList () {
      return this.$store.getters.getPaymentsList
    },
    currentElements () {
      const { n, page } = this
      return this.paymentsList.slice(n * (page - 1), n * (page - 1) + n)
    }
  },
  methods: {
    ...mapMutations({
      addData: "setPaymentsListData"
    }),
    changePage (p) {
      this.page = p
      this.$store.dispatch("fetchData", p)
    },
    addPayment () {
      this.$modal.show({ title: "Add Payment Form", content: "AddPaymentForm" })
    },
    checkUrl () {
      const { action, category, section } = this.$route.params
      this.$modal.show({
        title: "Add Payment Form",
        content: "AddPaymentForm",
        data: {
          action: action || "",
          category: category || "",
          section: section || "",
          amount: this.$route.query?.value || ""
        }
      })
    }
  },
  async created () {
    if (this.$route.params.page) {
      this.page = Number(this.$route.params.page)
    }
    await this.$store.dispatch("fetchData")
    await this.$store.dispatch("fetchCategoryList")
    if (this.$route.name === "AddPaymentFromUrl") {
      this.checkUrl()
    }
  }
}
</script>
<style></style>
