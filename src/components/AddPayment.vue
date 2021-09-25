<template>
<div>
    <div>
        <button class="newPayment" @click='show = !show'> Add new cost </button>    
    </div>
    <div v-if="show">
      <input class="form" v-model="date" placeholder="Payment date" />
      <input class="form" v-model.trim="category" placeholder="Payment category"/>
      <input class="form" v-model.number="value" type="number" placeholder="Payment Amount"/>
      <button class="addBtn" @click="onClick"> 
        Add Data
      </button>
    </div>
</div>
</template>

<script>
export default {
    name: "AddPayment",
    data(){
        return {
            show: false,
            date: "",
            category: "",
            value: ""
        }
    },
    methods: {
        onClick(){
            const { category, value } = this
            const data = {
                date: this.date || this.getCurrentDate,
                category,
                value
            }
            console.log('add', data)
            //Вызов события, название события и аргументы
            this.$emit('addNewPayment', data)
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
                year: "numeric",
            }).format(new Date());
        }
    }
};
</script>

<style lang="scss" scoped>
    .newPayment {
        margin-bottom: 10px;
        margin-top: 20px;
        background-color: cadetblue;
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 700;
        padding: 5px;
        border-radius: 3px;
        border: 1px solid grey;
    }

    .addBtn {
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
</style>