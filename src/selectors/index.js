export const getProducts = state => state.products

export const getSelectedTotalNum = state =>
  state.products.reduce((acc, cur) => acc + cur.selectedNum, 0)

export const getSelectedProducts = state =>
  state.products.filter(el => el.selectedNum !== 0)

export const getSubTotalOfSelectedProducts = state =>
  getSelectedProducts(state)
    .reduce((acc, cur) => acc + cur.price * cur.selectedNum, 0)
    .toFixed(2)

export const getPromoAmount = (state, subTotal) => {
  const { discounttype, amount } = state.promoCode

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
  switch (state.checkoutProducts.msg) {
    case 'SUCCESS':
      return 'SUCCESS'
    default:
      return ''
  }
}
