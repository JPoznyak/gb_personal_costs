<!-- <template>
  <div>
    <div>
      <button class="newPayment" @click="show = !show">Add new cost +</button>
    </div>
    <div v-if="show">
      <input class="form" v-model="date" placeholder="Payment date" />
      <input class="form" v-model.number="amount" type="number" placeholder="Payment Amount" />
      <input class="form" v-model.trim="category" placeholder="Payment category" /> 
      <select class="select" v-model="category" v-if="options">
        <option value="" disabled selected hidden>Select Category</option>
        <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
      </select>
      <add-category class="addBtn"/>
      <button class="addBtn" @click="onClick" :disabled="!category">Add Data</button>
    </div>
  </div>
</template>

<script> 
import { mapActions } from "vuex"
import addCategory from "./AddCategory.vue"

 export default {
   name: "AddPayment",
   components: {
     addCategory
   },
   props: {
    data: Object
   },
   data() {
     return {
       show: false,
       date: "",
       category: "",
       amount: ""
     };
   },

   methods: {
    ...mapActions([
        'fetchCategoryList'
     ]),

     onClick() {
       const data = {
         amount: Number(this.amount),
         date: this.date || this.getCurrentDate,
         category: this.category,
       };
       //Вызов события, название события и аргументы
     //   this.$emit("addNewPayment", data);
      this.$store.commit('addDataToPaymentList', data)
     }
   },

   computed: {
     // getCurrentDate() {
     //     const today = new Date()
     //     const d = today.getDate()
     //     const m = today.getMonth() + 1
     //     const y = today.getFullYear()
     //     return `${d}.${m}.${y}`
     // }

     getCurrentDate() {
       return new Intl.DateTimeFormat("ru-RU", {
         day: "2-digit",
         month: "2-digit",         
         year: "numeric"
       }).format(new Date());
     },
     options() {
       return this.$store.getters.getCategoriesList;
     }
   },


 async created(){
     await this.fetchCategoryList()
     if(this.$route.name === 'AddPaymentFromUrl') {
       this.amount = Number(this.$route.query?.amount)|| 0,
       this.category = this.$route?.params?.category || ''     
       //   this.$router.push('/dashboard')
     }
 },

 };
 </script>

 <style lang="scss" scoped>
     .newPayment {
         width: 130px;
         // margin-bottom: 10px;
         // margin-top: 10px;
         background-color: cadetblue;
         color: #FFFFFF;
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
     

<template>
  <!-- <div class="form">
    <input placeholder="Amount" v-model="amount" />
    <input placeholder="Date" v-model="date" />
    <select v-model="type">
      <option v-for="option in categoryList" :key="option">
        {{ option }}
      </option>
    </select>
    <button @click="onSaveClick">Save!</button>
  </div> -->


  <div>
    <div>
      <button class="newPayment" @click="show = !show">Add new cost +</button>
    </div>
    <div v-if="show">
      <input class="form" v-model="date" placeholder="Payment date" />
      <input class="form" v-model.number="amount" type="number" placeholder="Payment Amount" />
      <!-- <input class="form" v-model.trim="category" placeholder="Payment category" />  -->
      <select class="select" v-model="category" v-if="options">
        <option value="" disabled selected hidden>Select Category</option>
        <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
      </select>
      <add-category class="addBtn"/>
      <button class="addBtn" @click="onClick" :disabled="!category">Add Data</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: {
    data: Object
  },
  data () {
    return {
        show: false,
        amount: "",
        category: "",
        date: ""
        }
  },
  computed: {
    categoryList () {
      return this.$store.getters.getCategoryList
    },
    getCurrentDate () {
      return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(new Date())
    }
  },
  methods: {
    onClick () {
      const data = {
        amount: Number(this.amount),
        type: this.type,
        date: this.date || this.getCurrentDate
      }
      this.addData(data)
    },
    addData (data) {
      this.$store.commit("addDataToPaymentsList", data)
    }
  },
  created () {
    console.log('created')
    if (this.data) {
      const { amount, category } = this.data
      this.type = category || ""
      this.amount = Number(amount) || 0
    }
  }
}
</script>

<style lang="scss" scoped>
     .newPayment {
         width: 130px;
         margin: auto 10px;
         // margin-top: 10px;
         background-color: cadetblue;
         color: #FFFFFF;
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
     