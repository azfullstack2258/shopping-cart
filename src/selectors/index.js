export const getProducts = state => state.products

export const getSelectedTotalNum = state =>
  state.cart.selectedProducts.reduce((acc, cur) => acc + cur.selectedNum, 0)

export const getSelectedProducts = state => state.cart.selectedProducts

export const getSubTotalOfSelectedProducts = state =>
  state.cart.selectedProducts
    .reduce((acc, cur) => acc + cur.price * cur.selectedNum, 0)
    .toFixed(2)

export const getPromoAmount = (state, subTotal) => {
  const { discounttype, amount } = state.cart.promoCode

  switch (discounttype) {
    case 'percent':
      return (subTotal / amount).toFixed(2)
    default:
      return 0
  }
}

export const getAllPrice = state => {
  const subTotal = getSubTotalOfSelectedProducts(state),
    promoAmount = getPromoAmount(state, subTotal),
    basketTotal = (subTotal - promoAmount).toFixed(2)
  return { subTotal, promoAmount, basketTotal }
}

export const getCheckoutProductsStatus = state => {
  switch (state.cart.msg) {
    case 'SUCCESS':
      return 'SUCCESS'
    default:
      return ''
  }
}
