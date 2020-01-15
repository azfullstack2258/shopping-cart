/* eslint-disable linebreak-style */
import { createSelector } from 'reselect'

export const getProducts = (state) => state.product
export const getSelectedProducts = (state) => state.cart.selectedProducts
export const getPromoCodeStatus = (state) => state.cart.promoCode
export const getCheckoutStatus = (state) => state.cart.checkout

export const getCartItemsCount = createSelector(getSelectedProducts,
  (selectedProducts) => Object.values(selectedProducts).reduce((acc, cur) => acc + cur, 0))

export const getCartItemsInfo = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) => ([
    ...Object.keys(selectedProducts).map((selectedProduct) => ({
      ...products.find((product) => selectedProduct === product.sku.toString()),
      count: selectedProducts[selectedProduct]
    }))
  ])
)

export const getTotalPriceOfCartItems = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) => (
    Object.keys(selectedProducts)
      .reduce((acc, cur) => {
        const price = products.find((product) => product.sku.toString() === cur).price || 0
        return acc + price * selectedProducts[cur]
      }, 0)
      .toFixed(2)
  )
)

export const getDiscountedPrice = (state, subTotal) => {
  const { discounttype, amount } = state.cart.promoCode

  if (discounttype === 'percent') {
    return (subTotal / amount).toFixed(2)
  } else {
    return 0
  }
}

export const getPrices = (state) => {
  const subTotal = getTotalPriceOfCartItems(state)
  const promoAmount = getDiscountedPrice(state, subTotal)
  const basketTotal = (subTotal - promoAmount).toFixed(2)
  return { subTotal, promoAmount, basketTotal }
}
