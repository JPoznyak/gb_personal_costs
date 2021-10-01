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
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        items: {
            type: Array,
            default: ()=>[]
        },
        showItems: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
th, td {
  padding-right: 60px;
}
</style>
