<template>
  <v-container>
    <v-row>
      <div class="text-h5 text-sm-h3">Take a look on your payments and add more!</div>

      <v-col>
            <v-btn color="rgb(94, 154, 156)" dark @click="dialog=!dialog">
              Add New Cost
              <v-icon>mdi-plus</v-icon>
            </v-btn>
        
        

        <!-- <v-dialog v-model="dialog" width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="rgb(94, 154, 156)" dark v-on="on" @click="dialog=!dialog">
              Add New Cost
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        </v-dialog> -->
        <PaymentsDisplay show-items :items="currentElements" />

        <add-payment @addNewPayment="addData" />

        <div :class="[$style.total]">Total: {{ getTotalAmount }}</div>

        <v-pagination :cur="page" :n="n" :length="paymentsList.length" @paginate="changePage" />
        <router-link to="/dashboard//add/payment/Food?value=200">Food-200</router-link>
        <router-link to="/dashboard/add/payment/Transport?value=50">Transport-50</router-link>
        <router-link to="/dashboard/add/payment/Entertainment?value=2000">Entertainment-2000</router-link>

        <modal-window-add-payment @close="onModalClose" v-if="modalIsShown" />
        <!-- <button @click="modalIsShown = true">Add Payment</button> -->
      </v-col>

      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Pagination from "../components/Pagination.vue";
// import AddPayment from "../components/AddPayment.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: { PaymentsDisplay },
  name: "Dashboard",
  data: () => ({
    dialog: false,
    page: 1,
    n: 10
    // modalIsShown: false
  }),
  //   watch: {
  //     $route(to) {
  //       if (to.name === "AddPaymentFromUrl") {
  //         this.checkUrl();
  //       }
  //     }
  //   },
  computed: {
    ...mapGetters(["getPaymentsList"]),
    getTotalAmount() {
      return this.$store.getters.getPaymentsListTotalAmount;
    },
    paymentsList() {
      return this.$store.getters.getPaymentsList;
    },
    currentElements() {
      const { n, page } = this;
      return this.paymentsList.slice(n * (page - 1), n * (page - 1) + n);
    }
  },
  methods: {
    ...mapMutations({
      addData: "setPaymentsListData"
    }),
    changePage(p) {
      this.page = p;
      this.$store.dispatch("fetchData", p);
    },
    // addPayment () {
    //   this.$modal.show({ title: "Add Payment", content: "AddPayment" })
    // },
    onModalClose() {
      this.modalIsShown = false;
    },
    checkUrl() {
      const { action, category, section } = this.$route.params;
      this.$modal.show({
        title: "Add Payment",
        content: "AddPayment",
        data: {
          action: action || "",
          category: category || "",
          section: section || "",
          amount: this.$route.query?.amount || ""
        }
      });
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
};
</script>

<style lang="scss" module>
.content {
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
