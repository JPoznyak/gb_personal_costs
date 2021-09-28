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
            <tr v-for="(item, idx) in list" :key="idx">
                <td>{{ idx + 1 }}</td>
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
        list: {
            type: Array,
            default: ()=>[]
        }
    }
}
</script>

<style>
th, td {
  padding-right: 60px;
}
</style>
