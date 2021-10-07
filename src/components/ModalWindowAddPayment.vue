<template>
  <div class="wrapper">
    <div class="header">{{ modalSettings.header }}</div>
    <div class="content">
        <component :is="modalSettings.name" />
        <div class="footer">
        <button @click="onClose">Close</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindowAddPayment",
  components: { 
    Auth: () => import('./Auth.vue'),
    AddPayment: () => import('./AddPayment.vue'),
    AddCategory: () => import('./AddCategory.vue')
  },
  props: {
    content: String,
    title: String,
    modalIsShow: Boolean,
    modalSettings: Object
  },
  methods: {
      onClose(){
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