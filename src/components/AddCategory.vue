<template>
  <div :class="[$style.addCategory]">
    <input v-model="category" placeholder="Category" />
    <button @click="addCategory">Add Category</button>
  </div>
</template>

<script>
export default {
  name: "AddCategory",
  data(){
    return {
      category: ''
    }
  },
  methods: {
    addCategory() {
      this.$store.commit("addCategoryToList", this.category);
    }
  }
};
</script>

<style module lang="scss">
.addCategory {
    display: flex;
    margin-left: -10px;
    & > input {
        // display: block;
        // margin-top: 10px;
        padding-left: 10px;
        width: 130px;
    }
    & > button {
        width: 130px;
        color: rgb(94, 154, 156);
        font-weight: 700;
        margin-left: 10px;
    }
}
</style>