<template>
    <div class="payments-list">
      <table>
         <thead>
             <tr>
                 <th>#</th>
                 <th>Date</th>
                 <th>Category</th>
                 <th>Amount</th>
             </tr>
         </thead>
         <tbody>
             <tr v-for="(item, idx) in items" :key="idx">
                 <td>{{ item.id }}</td>
                 <td>{{ item.date }}</td>
                 <td>{{ item.category }}</td>
                 <td>{{ item.amount }}</td>
                 <td @click="onClickContextItem($event,item)" class="contextevent">...</td>
             </tr>
         </tbody>
       </table>
   </div>
</template>

<script>
export default {
  name: "PaymentDisplay",
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
