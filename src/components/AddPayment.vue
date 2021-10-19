<template>
  <v-card class="text-left pa-8">
    <template>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field class="font-weight-light"
                v-model="date"
                label ="Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        
      </v-layout>
    </template>
        <!-- <v-text-field v-model="date" label="Date"/> -->
        <v-select v-model="category" label="Category" :items="categoryList"/>
        <v-text-field v-model="amount" label="Amount"/>
      <v-btn @click="onClick">Save!</v-btn>

  </v-card>
</template>
    

<script>
export default {
  name: "AddPayment",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      amount: "",
      category: ""
      // date: ""
    };
  },
  computed: {
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
    getCurrentDate() {
      return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(new Date());
    }
  },
  methods: {
    onClick() {
      const data = {
        amount: Number(this.amount),
        category: this.category,
        date: this.date || this.getCurrentDate
      };
      this.addData(data);
    },
    addData(data) {
      this.$store.commit("addDataToPaymentsList", data);
    }
  },
  created() {
    console.log("created");
    if (this.data) {
      const { amount, category } = this.data;
      this.type = category || "";
      this.amount = Number(amount) || 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.newPayment {
  width: 130px;
  margin: auto 10px;
  // margin-top: 10px;
  background-color: cadetblue;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid grey;
  text-transform: uppercase;
}

.addBtn {
  width: 130px;
  color: rgb(94, 154, 156);
  font-weight: 700;
  margin-top: 10px;
  padding: 10px;
}

.form {
  display: block;
  margin-top: 10px;
  padding: 10px;
  width: 250px;
}

.select {
  display: block;
  color: rgb(128, 125, 125);
  padding: 10px 8px;
  margin-top: 10px;
}
</style> -->
     