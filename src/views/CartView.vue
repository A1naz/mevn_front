<template>
  <UserForm v-model:show="formShow" />

  <div class="cart-container">
    <template v-if="cartStore.products.length > 0">
      <div class="cart-items">
        <div class="cart-info">
          <div>Стоимость заказа: {{ cartStore.totalPrice }} $</div>
          <div>
            <button type="button" class="btn btn-success" @click="showDialog">
              Купить
            </button>
          </div>
        </div>

        <ul class="list-group" v-for="item in cartStore.products">
          <li
            style="border-radius: 15px"
            class="list-group-item list-group-item-action list-group-item-dark"
          >
            {{ item.title }} - {{ item.price }} $
            <div class="card-item">
              <img :src="item.imageUrl" />
              <button
                type="button"
                class="btn btn-danger"
                @click="cartStore.addProduct(item)"
              >
                Удалить из корзины
              </button>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <div class="empty-img">Your cart is empty please add items to it</div>
      <img
        class="center"
        src="https://images.freeimages.com/clg/images/21/217243/cm-isometric-shopping-cart-empty_f"
      />
    </template>
  </div>
</template>
<script>
import { useCartStore } from '@/store/cart'
import { usePaymentStore } from '@/store/payment'
import UserForm from '@/components/layouts/UserForm.vue'
import MevnAlert from '@/components/layouts/Alert.vue'

export default {
  name: 'Cart',
  el: '#demo',
  components: {
    MevnAlert,
    UserForm,
  },
  data: () => ({
    cartCount: 0,
    show: false,
    formShow: false,
  }),
  setup() {
    const cartStore = useCartStore()
    const paymentStore = usePaymentStore()

    return {
      cartStore,
      paymentStore,
    }
  },
  mounted() {
    this.cartCount = this.cartStore.productsCount
  },
  async computed() {},
  methods: {
    async openPaymentURL() {
      window.open(
        await this.paymentStore.createPayment(this.cartStore.totalPrice)
      )
    },
    async fetchPayment() {
      await this.paymentStore.fetchPayment()
      if (this.show != true) {
        setTimeout(() => {
          this.show = false
        }, 3000)
      }
      this.show = true
    },
    showDialog() {
      this.formShow = true
    },
  },
}
</script>
<style scoped lang="scss">
.empty-img {
  text-align: center;
  font-size: 20px;
  margin: 10px;
}
.center {
  display: flex;
  margin-top: 2rem;
  margin-right: auto;
  margin-left: auto;
}
.cart-container {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  flex-wrap: wrap;

  img {
    border-radius: 10px;
    height: 300px;
    width: 250px;
    background-repeat: no-repeat;
    object-fit: cover;
    object-position: top;
    margin-top: 10px;
  }

  .cart-items {
    margin-right: 10%;
    margin-left: 10%;
    background: transparent;

    img {
      border-radius: 10px;
      height: 200px;
      width: 250px;
      background-repeat: no-repeat;
      object-fit: cover;
      object-position: top;
      margin-top: 10px;
    }
    span {
      width: 100%;
    }
  }

  .list-group-item-dark {
    background: #2d3339;
    color: aliceblue;
    margin-top: 10px;
  }
}
.card-item {
  background: #2d3339;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .btn {
    height: 40px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
}

.cart-info {
  justify-content: space-between;
  display: flex;
  margin: 10px 30px;
  font-size: 25px;
  color: #f0f8ff;

  .btn {
    width: 120px;
    height: 40px;
    font-size: 18px;
  }

  .btn-info {
    width: 180px;
    margin-left: 10px;
  }
}
</style>
