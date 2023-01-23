<template>
  <div class="app">
    <MevnHeader :categories="categories" />
 
    <router-view />
  </div>
</template>

<script>
import MevnHeader from '@/components/layouts/Header'
import { useCategoryStore } from '@/store/category'
import { useCartStore } from '@/store/cart'
export default {
  name: 'App',
  components: {
    MevnHeader,
  },
  data: () => ({
    categories: [],
  }),
  setup() {
    const categoryStore = useCategoryStore()
    const cartStore = useCartStore()

    return {
      categoryStore,
      cartStore,
    }
  },
  async mounted() {
    this.categories = await this.categoryStore.fetchCategories()
  },
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  -text-align: center;
  color: #bebebe;
  background: #202124;
}

header {
  * {
    background: transparent;
  }
}

.text-bg-dark {
  background-color: #242926;
}
</style>
