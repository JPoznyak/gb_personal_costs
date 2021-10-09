<template>
    <div>Anything about our awesome applications</div>
    <button @click="openModalAuth">OpenAuth</button>
</template>

<script>
export default {
    name: "About",
    methods: {
    openModalAuth () {
      this.$modal.show({ title: "Auth", content: "Auth" })
    }
  }
}
</script>

<style></style>