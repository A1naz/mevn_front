<template lang="">
  <div class="card_border">
    <div class="card">
      <div class="card_header">{{ title }} - {{ price }} $</div>
      <img :src="imageUrl" />
      <div class="card_footer">
        <button
          v-if="!inCart"
          type="button"
          class="btn btn-dark"
          @click="$emit('addToCart')"
        >
          Добавить в корзину
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="$emit('addToCart')"
          v-else
        >
          Убрать из корзины
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    _id: {
      type: String,
      default: '',
    },
    inCart: {
      type: Boolean,
      default: 0,
    },
  },
}
</script>
<style scoped lang="scss">
.card_border {
  border: 4px solid transparent;
  margin: 0 5px;
  border-radius: 40px;
  margin-right: auto;
  margin-left: auto;
}

.card {
  margin-bottom: 10px;
  width: max-content;
  align-items: center;
  background: #2d3339;
  border-radius: 2rem;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 400px;

  img {
    border-radius: 10px;
    height: 200px;
    width: 97%;
    background-repeat: no-repeat;
    object-fit: cover;
    object-position: center;
  }
}

.card_header {
  background-color: transparent;
  margin: 2px;
  padding: 3px;
}
.card_footer {
  background-color: transparent;
  button {
    // border-radius: 10px;
    // border-color: #0b0d18;
    height: 45px;
    width: 180px;
    font-size: 16px;
    margin: 10px 0 0 0;
    // background-color: #242948;
  }
  // button:hover {
  //   box-shadow: 0 0 10px 3px #a2a2a2;
  // }
}

// .card:hover {
//   box-shadow: 0 0 20px 5px #a2a2a2;
// }
</style>
