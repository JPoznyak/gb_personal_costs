<template>
<v-container>
    <v-row>
        <v-col :cols="1">#</v-col>
        <v-col :cols="4">Date</v-col>
        <v-col :cols="5">Category</v-col>
        <v-col :cols="2">Amount</v-col>
    </v-row>
     <v-row v-for="(pay, idx) in items" :key="idx">
        <v-col :cols="1">{{ pay.id }}</v-col>
        <v-col :cols="4">{{ pay.date }}</v-col>
        <v-col :cols="5">{{ pay.category }}</v-col>
        <v-col :cols="2">{{ pay.amount }}</v-col>
    </v-row>
</v-container>
</template>


<!-- <td @click="onClickContextItem($event,item)" class="contextevent">...</td> -->
             

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
//   methods: {
//     onClickContextItem (event, item) {
//       const items = [
//         {
//           text: "Edit",
//           action: () => {
//             console.log("edit", item)
//           }
//         },
//         {
//           text: "Delete",
//           action: () => {
//             this.actionDelete(item.id)
//           }
//         }
//       ]
//       this.$context.show({ event, items })
//     },
//     actionDelete (id) {
//       console.log(id)
//       // mutation deleteItem
//       this.$context.close()
//     }
//   }
}
</script>