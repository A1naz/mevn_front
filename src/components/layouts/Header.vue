<template>
  <!-- <header class="header">
    <router-link to="/" class="header_left">
      <img
        src="@/assets/logo.png"
      />
    </router-link>

    <div class="header_right">
      <div style="text-align: end">
        <router-link
          to="/cart"
          style="color: aliceblue; text-decoration: none; margin-right: 15px"
        >
          Cart {{ cartStore.productsCount }}
        </router-link>
      </div>
      <ul class="nav">
        <li class="nav_link" v-for="category in categories" :key="key">
          <router-link
            :to="`category/${category._id}`"
            style="color: aliceblue"
          >
            {{ category.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </header> -->
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <a
          href="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <svg
            class="bi me-2"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"
          >
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>

        <router-link to="/" class="logo">
          <img src="@/assets/logo.png" />
        </router-link>

        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li v-for="category in categories" :key="key" style="margin: 0px 5px">
            <router-link
              :to="`category/${category._id}`"
              style="color: aliceblue; text-decoration: none"
            >
              {{ category.title }}
            </router-link>
          </li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            class="form-control form-control-dark text-bg-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2">
            Login
          </button>
          <button type="button" class="btn btn-info">Sign-up</button>
          <router-link
            to="/cart"
            style="color: aliceblue; text-decoration: none; margin-right: 15px"
          >
            <img src="@/assets/cart.png" />
            Cart: {{ cartStore.productsCount }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useCartStore } from '@/store/cart'
export default {
  name: 'MevnHeader',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const cartStore = useCartStore()
    return {
      cartStore,
    }
  },
  async mounted() {
    this.cartCount = await this.cartStore.productCount
    
  },
}
</script>

<style lang="scss" scoped>
.logo {
  img {
    width: 100px;
    margin: -20px 0;
    margin-right: 50px;
  }
}

.text-end {
  img {
    width: 32px;
    margin-left: 30px;
  }
}
</style>
