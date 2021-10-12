export default {
  install(Vue) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.prototype.$modal = {
      EventBus: new Vue(),

      show(setting) {
        this.EventBus.$emit('show', setting)
        console.log('show', setting)
      },

      hide() {
        this.EventBus.$emit('hide')
        console.log('hide')
      },
    };
  },
};