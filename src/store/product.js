import { defineStore } from 'pinia'
import { getProduct, getProducts } from '@/services/product.service'
import { ref } from 'vue'

export const useProductStore = defineStore('productsStore', () => {
  const product = ref({})
  const products = ref([])

  const fetchProduct = async (id) => {
    product.value = await getProduct(id).data
    return product.value
  }

  const fetchProducts = async () => {
    products.value = (await getProducts()).data
    return products.value
  }

  return {
    product,
    products,
    fetchProduct,
    fetchProducts,
  }
})
