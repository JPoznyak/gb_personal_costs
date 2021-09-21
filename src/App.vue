<template>
  <div id="app" :class="[$style.wrapper]">
    <header>
      <h1>My personal cost</h1>
    </header>
    <main>
      <AddPayment @addNewPayment="addData" />
      <br/>
      <PaymentsDisplay :list="paymentsList" />
      <Pagination :cur="curPage" 
                  :n="n" 
                  :length="paymentsList.length" 
                  @paginate="onChangePage"
      />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import Pagination from "./components/Pagination.vue";
import AddPayment from "./components/AddPayment.vue";

export default {
  name: "App",
  components: {
    PaymentsDisplay,
    AddPayment,
    Pagination
  },

  data: () => ({
    paymentsList: [],
    page: '',
    curPage: 1,
    n: 1,
  }),

  methods: {
    addData(data){
      console.log("push to state",data)
      // this.paymentsList.push(data)
      this.paymentsList = [...this.paymentsList, data]
     
    }, 
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169
        },
        {
          date: "20.04.2021",
          category: "Sport",
          value: 400
        },
        {
          date: "28.05.2020",
          category: "Internet",
          value: 200
        },
        {
          date: "01.03.2019",
          category: "Family",
          value: 2000
        },
        {
          date: "25.07.2020",
          category: "Sport",
          value: 500
        },
      ];
    }
  },

  created(){

    this.paymentsList = this.fetchData()
  }
};
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
}
</style>
