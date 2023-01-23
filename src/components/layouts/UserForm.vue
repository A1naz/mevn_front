<template>
  <div @click="updateShow">
    <form v-if="show">
      <div class="alert">
        <Transition name="bounce">
          <MevnAlert
            :paymentStatus="paymentStore.paymentStatus"
            v-if="alertShow"
          />
        </Transition>
      </div>

      <div class="dialog">
        <div class="dialog_content" @click.stop>
          <div class="form-group">
            <label style="background: rgb(82, 77, 77); color: white" for="name"
              >Имя</label
            >
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="ваше имя"
              v-model="name"
            />
            <p
              v-if="v$.name.$error"
              class="text-danger"
              style="
                background: transparent;
                margin: 1px 1px 0px 1px;
                font-size: 18px;
                text-align: center;
              "
            >
              Введите имя
            </p>
            <label style="background: rgb(82, 77, 77); color: white" for="name"
              >Адрес</label
            >
            <input
              type="text"
              class="form-control"
              id="address"
              placeholder="ваш адрес"
              v-model="address"
            />
            <p
              v-if="v$.address.$error"
              class="text-danger"
              style="
                background: transparent;
                margin: 1px 1px 0px 1px;
                font-size: 18px;
                text-align: center;
              "
            >
              Введите адрес
            </p>
            <label style="background: rgb(82, 77, 77); color: white" for="name"
              >e-mail</label
            >
            <input
              type="text"
              class="form-control"
              :id="email"
              placeholder="ваша электронная почта"
              v-model="email"
            />
            <p
              v-if="v$.email.$error"
              class="text-danger"
              style="
                background: transparent;
                margin: 1px 1px 0px 1px;
                font-size: 18px;
                text-align: center;
              "
            >
              Введите email
            </p>
            <label style="background: rgb(82, 77, 77); color: white" for="name"
              >Телефон</label
            >
            <input
              type="text"
              class="form-control"
              :id="name"
              placeholder="ваш номер телефона"
              v-model="phone"
            />
            <p
              v-if="v$.phone.$error"
              class="text-danger"
              style="
                background: transparent;
                margin: 1px 1px 0px 1px;
                font-size: 18px;
                text-align: center;
              "
            >
              Введите ваш телефон
            </p>
          </div>
          <div class="pay_items">
            {{ cartStore.totalPrice }} $
            <button
              type="button"
              class="btn btn-success"
              @click="openPaymentURL"
            >
              Оплатить
            </button>
            <button
              type="button"
              class="btn btn-info"
              @click="fetchPayment"
              v-if="paymentStore.paymentUrl != ''"
            >
              Проверить оплату
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { usePaymentStore } from '@/store/payment'
import { useCartStore } from '@/store/cart'
import MevnAlert from '@/components/layouts/Alert.vue'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Address from 'ipaddr.js'
export default {
  props: {
    show: false,
  },
  components: {
    MevnAlert,
  },
  setup() {
    const paymentStore = usePaymentStore()
    const cartStore = useCartStore()
    return {
      paymentStore,
      cartStore,
    }
  },
  data: () => ({
    alertShow: false,
    v$: useValidate(),
    name: '',
    address: '',
    email: '',
    phone: '',
    // properties: [
    //   {
    //     text: 'Ваше имя',
    //     id: 'name',
    //     placeholder: 'имя',
    //     modelValue: name,
    //     type: 'text',
    //   },
    //   {
    //     text: 'Ваш адрес',
    //     id: 'address',
    //     placeholder: 'адрес',
    //     modelValue: '',
    //     type: 'text',
    //   },
    //   {
    //     text: 'Ваш номер телефона',
    //     id: 'phone',
    //     placeholder: '+7 *** *** ** **',
    //     modelValue: '',
    //     type: 'text',
    //   },
    //   {
    //     text: 'Ваша электронная почта',
    //     id: 'email',
    //     placeholder: 'электронная почта',
    //     modelValue: '',
    //     type: 'email',
    //   },
    // ],
  }),
  validations() {
    return {
      name: { required },
      address: { required },
      email: { required },
      phone: { required },
    }
  },
  methods: {
    updateShow(event) {
      this.$emit('update:show', event.target.show)
    },

    async openPaymentURL() {
      this.v$.$validate()
      if (!this.v$.$error) {
        let form = [this.name, this.address, this.email, this.phone]
        window.open(await this.paymentStore.createPayment(...form))
      }
    },
    async fetchPayment() {
      await this.paymentStore.fetchPayment()
      if (this.alertShow != true) {
        setTimeout(() => {
          this.alertShow = false
        }, 3000)
      }
      this.alertShow = true
    },
  },
}
</script>
<style lang="scss">
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  margin: 0;
  z-index: 100;
}

.dialog_content {
  margin: auto;
  width: 50%;
  background: rgb(82, 77, 77);
  border-radius: 12px;
  min-height: 100px;
  min-width: 300px;
  padding: 30px 20px;
}
.form-group {
  font-size: 20px;
  background: rgb(82, 77, 77);
  margin: 10px 5px;
}

.form-control {
  font-size: 18px;
}
.pay_items {
  background: rgb(82, 77, 77);
  display: flex;
  color: white;
  font-size: 25px;
  padding: 0 8px;
  margin: 16px 0 0 0;
  button {
    margin-left: 13px;
    font-size: 18px;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.alert {
  position: fixed;
  z-index: 999;
  width: 80%;
  height: 50px;
  text-align: center;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
