<template>
  <div class="wrapper" v-if="modalIsShow">
    <div class="overlay"></div>
    <div class="header">{{ title }}</div>
    <div class="content">
      <component :is="content" :data="data"/>
      <div class="footer">
        <button @click="onCloseClick">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindowAddPayment",
  components: {
    Auth: () => import("./Auth.vue"),
    AddPayment: () => import("./AddPayment.vue")
  },
  props: {
    content: String,
    title: String,
    modalIsShow: Boolean,
    data: Object
  },
  methods: {
    onCloseClick () {
      this.$modal.hide()
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  border: 1px solid red;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & .overlay {
    z-index: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(68, 61, 61, 0.5);
  }
  & .content {
    position: relative;
    z-index: 100;
  }
}
</style>