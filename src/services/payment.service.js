import { request } from './generic.service'

const checkPayment = (id) => request({ url: `payment/${id}`, method: 'get' })
const createPaymentIntent = (fullname, address, phone, email, products) =>
  request({ url: `payment`, method: 'post', data: {fullname, address, phone, email, products} })

export { checkPayment, createPaymentIntent }
