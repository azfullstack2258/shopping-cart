import { createSelector } from 'reselect'

export const getCart = state => state.cart
export const getProducts = state => state.product
export const getSelectedProducts = state => state.cart.selectedProducts

export const getCartItemsCount = createSelector(getSelectedProducts, selectedProducts =>
  Object.values(selectedProducts).reduce((acc, cur) => acc + cur, 0)
)

export const getCartItemsInfo = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) => {
    return [
      ...Object.keys(selectedProducts).map(selectedProduct => {
        return {
          ...products.find(product => selectedProduct === product.sku.toString()),
          count: selectedProducts[selectedProduct]
        }
      })
    ]
  }
)

export const getTotalPriceOfCartItems = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) =>
    Object.keys(selectedProducts)
      .reduce((acc, cur) => {
        const price = products.find(product => product.sku.toString() === cur).price || 0
        return acc + price * selectedProducts[cur]
      }, 0)
      .toFixed(2)
)

export const getDiscountedPrice = (state, subTotal) => {
  const { discounttype, amount } = state.cart.promoCode

  switch (discounttype) {
    case 'percent':
      return (subTotal / amount).toFixed(2)
    default:
      return 0
  }
}

export const getPrices = state => {
  const subTotal = getTotalPriceOfCartItems(state)
  const promoAmount = getDiscountedPrice(state, subTotal)
  const basketTotal = (subTotal - promoAmount).toFixed(2)
  return { subTotal, promoAmount, basketTotal }
}

export const getCheckoutStatusMsg = createSelector(getCart, item => {
  switch (item.msg) {
    case 'SUCCESS':
      return 'SUCCESS'
    default:
      return ''
  }
})
