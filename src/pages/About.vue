<template>
    <div>Anything about our awesome applications
    <button @click="openModalAuth">OpenAuth</button>
    </div>
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
