<template>
<v-container>
    <v-row>
        <v-col :cols="1">#</v-col>
        <v-col :cols="4">Date</v-col>
        <v-col :cols="5">Category</v-col>
        <v-col :cols="2">Amount</v-col>
    </v-row>
     <v-row v-for="item in items" :key="item">
        <v-col :cols="1">{{ item.id }}</v-col>
        <v-col :cols="4">{{ item.date }}</v-col>
        <v-col :cols="5">{{ item.category }}</v-col>
        <v-col :cols="2">{{ item.amount }}</v-col>
    </v-row>
</v-container>
</template>


// <td @click="onClickContextItem($event,item)" class="contextevent">...</td> -->
             

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    showItems: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    onClickContextItem (event, item) {
      const items = [
        {
          text: "Edit",
          action: () => {
            console.log("edit", item)
          }
        },
        {
          text: "Delete",
          action: () => {
            this.actionDelete(item.id)
          }
        }
      ]
      this.$context.show({ event, items })
    },
    actionDelete (id) {
      console.log(id)
      // mutation deleteItem
      this.$context.close()
    }
  }
}
</script>

<style>
.payments-list {
    display: flex;
    
    margin: auto 50px; 
}
.contextevent {
  cursor: pointer;
}
th, td {
   padding-right: 60px;
}
</style>
