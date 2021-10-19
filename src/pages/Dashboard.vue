<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3">Take a look on your payments and add more!</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="rgb(94, 154, 156)" dark v-on="on" @click="dialog=!dialog">
              Add New Cost
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <add-payment />
          </v-card>
        </v-dialog>
        <PaymentsDisplay show-items :items="currentElements" />
        <template>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="currentElements.length"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            ></v-pagination>
          </div>
        </template>
      </v-col>
      <v-col>Chart</v-col>
    </v-row>

        
  </v-container>
</template>

<script>
// import Pagination from "../components/Pagination.vue";
import AddPayment from "../components/AddPayment.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: { PaymentsDisplay, AddPayment },
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
    addPayment() {
      this.$modal.show({ title: "Add Payment", content: "AddPayment" });
    }
    // onModalClose() {
    //   this.modalIsShown = false;
    // },
    // checkUrl() {
    //   const { action, category, section } = this.$route.params;
    //   this.$modal.show({
    //     title: "Add Payment",
    //     content: "AddPayment",
    //     data: {
    //       action: action || "",
    //       category: category || "",
    //       section: section || "",
    //       amount: this.$route.query?.amount || ""
    //     }
    //   });
    // }
  },
  created() {
    // if (this.$route.params.page) {
    //   this.page = Number(this.$route.params.page);
    // }
    this.$store.dispatch("fetchData", 1);
    this.$store.dispatch("fetchCategoryList");
    // if (this.$route.name === "AddPaymentFromUrl") {
    //   this.checkUrl();
    // }
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
