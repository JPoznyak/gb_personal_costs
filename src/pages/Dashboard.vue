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
        <div :class="[$style.total]">Total: {{TotalAmount}}</div>
      </div>
      <div :class="[$style.content]">
        <router-link to="/dashboard/add/payment/Food?amount=200">Food-200</router-link>/
        <router-link to="/dashboard/add/payment/Transport?amount=50">Transport-50</router-link>/
        <router-link to="/dashboard/add/payment/Entertainment?amount=2000">Entertainment-2000</router-link>
      </div>
      <div :class="[$style.content]">
        <pagination :cur="curPage" :n="n" :length="paymentsList.length" @paginate="changePage" />
      </div>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import Pagination from "../components/Pagination.vue";
import AddPayment from "../components/AddPayment.vue";
// import addCategory from "./components/AddCategory.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    AddPayment,
    // addCategory,
    Pagination
  },
  data: () => ({
    page: "",
    curPage: 1,
    n: 5
  }),
  watch: {
    $route(to) {
      if (to.name === "AddPaymentFromUrl") {
        this.showCompletedPaymentForm();
      }
    }
  },

  methods: {
    ...mapMutations({
      addDataToStore: "addDataToPaymentList"
    }),
    ...mapActions({
      fetchListData: "fetchData"
    }),
    addData(newPayment) {
      // this.paymentsList.push(data)
      // this.paymentsList = [...this.paymentsList, data]
      this.addDataToStore(newPayment);
      console.log(newPayment);
    },
    changePage(p) {
      this.curPage = p;
    },
    addCategory() {
      this.$store.commit("addCategoryToList", this.category);
    },
    showCompletedPaymentForm () {
      const { action, category, section } = this.$route.params
      this.$modal.show({
        title: "Add Payment Form",
        content: "AddPaymentForm",
        data: {
          action: action || "",
          category: category || "",
          section: section || "",
          amount: this.$route.query?.amount || ""
        }
      })
    }
  },

  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
      categories: "getCategoriesList"
    }),
    currentElements() {
      const { n, curPage } = this;
      return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n);
    },
    TotalAmount() {
      return this.$store.getters.getPaymentsListTotalAmount;
    }
    // // paymentsList(){
    // //   return this.$store.getters.getPaymentList
    // }
  },

  actions: {
    ...mapActions(["fetchCategoryList"])
  },

  mounted() {
    if (!this.categories.length) {
      this.addCategory();
    }
  },

  async created() {
    if (this.$route.params.page) {
      this.page = Number(this.$route.params.page);
    }
    await this.$store.dispatch("fetchData");
    await this.$store.dispatch("fetchCategoryList");
    if (this.$route.name === "AddPaymentFromUrl") {
      this.checkUrl();
    }
  }
}

</script>

<style lang="scss" module>
.wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: block;
  height: 100%;
}
.content {
  //   padding-top: 20px;
  padding-bottom: 20px;
    & > a {
    padding-right: 10px;
  }
}
.total {
  padding-top: 20px;
  color: red;
  font-weight: 700;
}
</style>
