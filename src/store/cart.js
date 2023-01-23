import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePaymentStore } from '@/store/payment'

export const useCartStore = defineStore('cartStore', () => {
  const products = ref([])
  const productsCount = ref(0)
  const totalPrice = ref(0)
  const productsIds = ref([])
  const paymentStore = usePaymentStore()

  const addProduct = async (product) => {
    if (!productsIds.value.includes(product._id)) {
      await products.value.push(product)
    } else {
      products.value = products.value.filter((item) => {
        if (item._id != product._id) {
          return item
        }
      })
    }

    productsCount.value = products.value.length
    totalPrice.value = products.value.map((item) => parseFloat(item.price))
    totalPrice.value = totalPrice.value.reduce(
      (total, current) => total + current,
      0
    )

    totalPrice.value = totalPrice.value.toFixed(2)
    productsIds.value = products.value.map((item) => item._id)
    if (products.value.length <= 0) {
      paymentStore.paymentUrl = ''
    }
  }

  return {
    productsIds,
    totalPrice,
    products,
    productsCount,
    addProduct,
  }
})
