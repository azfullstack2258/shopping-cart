import { createSelector } from 'reselect'

export const getCart = state => state.cart
export const getProducts = state => state.product
export const getSelectedProducts = state => state.cart.selectedProducts

export const getCartItemsCount = createSelector(getSelectedProducts, selectedProducts =>
  selectedProducts.reduce((acc, cur) => acc + cur.count, 0)
)

export const getCartItemsInfo = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) => {
    return [
      ...selectedProducts.map(selectedProduct => {
        return {
          ...products.find(product => product.sku === selectedProduct.sku),
          count: selectedProduct.count
        }
      })
    ]
  }
)

export const getTotalPriceOfCartItems = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) =>
    selectedProducts
      .reduce((acc, cur) => {
        const res = products.filter(el => el.sku === cur.sku)
        const price = res.length ? res[0].price : 0
        return acc + price * cur.count
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
  const subTotal = getTotalPriceOfCartItems(state),
    promoAmount = getDiscountedPrice(state, subTotal),
    basketTotal = (subTotal - promoAmount).toFixed(2)
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
