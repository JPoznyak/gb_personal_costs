<template>
  <div class="payments-list">
     <div class="items" v-for="(item, idx) in list" :key="idx">
         {{item.id }} {{ item }}
     </div>
  </div>
</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        list: {
            type: Array,
            default: ()=>[]
        }
    },
    data(){
        return {
        }
    }
}
</script>

<style lang="scss" module>
items {
  padding-right: 20px;
}
</style>
