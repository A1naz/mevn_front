<template>
  <div class="home">
    <div class="product_list">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :title="product.title"
        :price="product.price"
        :imageUrl="product.imageUrl"
        @addToCart="cartStore.addProduct(product)"
        :inCart = "cartStore.productsIds.includes(product._id)"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/layouts/ProductCard.vue'
import { useProductStore } from '@/store/product'
import { useCartStore } from '@/store/cart'
export default {
  name: 'Home',
  components: {
    ProductCard,
  },
  data: () => ({
    products: [],
  }),
  setup() {
    const productStore = useProductStore()
    const cartStore = useCartStore()

    return {
      productStore,
      cartStore
    }
  },
  async mounted() {
    this.products = await this.productStore.fetchProducts()
  },
}
</script>

<style scoped>
.home {
  display: flex;
  font-size: 1.3rem;
  margin: 5px;
  align-items: center;
  flex-direction: column;
}
.product_list {
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
}
</style>
