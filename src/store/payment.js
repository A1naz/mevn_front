import { defineStore } from 'pinia'
import { useCartStore } from '@/store/cart'
import { checkPayment, createPaymentIntent } from '@/services/payment.service'
import { ref } from 'vue'

export const usePaymentStore = defineStore('PaymentStore', () => {
  const paymentIntent = ref({})
  const paymentStatus = ref('')
  const paymentUrl = ref('')
  const paymentId = ref('')

  const cartStore = useCartStore()

  const createPayment = async (fullname, address, phone, email) => {
    paymentIntent.value = (
      await createPaymentIntent(
        fullname,
        address,
        phone,
        email,
        cartStore.products
      )
    ).data
    paymentUrl.value = paymentIntent.value.paymentIntent.payUrl
    paymentId.value = paymentIntent.value.paymentIntent.billId
    return paymentUrl.value
  }

  const fetchPayment = async () => {
    paymentStatus.value = (
      await checkPayment(paymentId.value)
    ).data.status.value

    if (paymentStatus.value === 'PAID') {
      cartStore.products = []
    }

    return paymentStatus.value
  }

  return {
    paymentIntent,
    paymentId,
    paymentStatus,
    paymentUrl,
    createPayment,
    fetchPayment,
  }
})
