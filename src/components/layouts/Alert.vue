<template>
  <div class="alerts">
    <div class="alert" role="alert" v-if="(paymentStatus = 'WAITNG')">
      Платеж ожидается
    </div>
    <div class="alert" role="alert" v-else-if="(paymentStatus = 'PAID')">
      Платеж выполнен
    </div>
  </div>
</template>
<script>
export default {
  name: 'MevnAlert',
  props: {
    paymentStatus: '',
  },
  data: () => ({}),
  methods: () => ({}),
}
</script>
<style scoped lang="scss">
.alert {
  margin: 20px;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(95, 120, 136);
  color: white;
  width: 40%;
  height: 50px;
  z-index: 999;
}
// .slide-fade-enter-active {
//   transition: all 0.3s ease-out;
// }

// .slide-fade-leave-active {
//   transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .slide-fade-enter-from,
// .slide-fade-leave-to {
//   transform: translateX(120px);
//   opacity: 0;
// }
</style>
