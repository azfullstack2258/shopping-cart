import { createSelector } from 'reselect'

export const getCart = state => state.cart
export const getProducts = state => state.products
export const getSelectedProducts = state => state.cart.selectedProducts

export const getSelectedTotalNum = createSelector(getCart, item =>
  item.selectedProducts.reduce((acc, cur) => acc + cur.selectedNum, 0)
)

export const getProductsFromCart = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProduct, product) => {
    return [
      ...selectedProduct.map(selectedItem => {
        return {
          ...product.find(item => item.sku === selectedItem.sku),
          selectedNum: selectedItem.selectedNum
        }
      })
    ]
  }
)

export const getSubTotalOfSelectedProducts = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProduct, product) =>
    selectedProduct
      .reduce((acc, cur) => {
        const res = product.filter(el => el.sku === cur.sku)
        const price = res.length ? res[0].price : 0
        return acc + price * cur.selectedNum
      }, 0)
      .toFixed(2)
)

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

export const getcheckoutCartStatus = createSelector(getCart, item => {
  switch (item.msg) {
    case 'SUCCESS':
      return 'SUCCESS'
    default:
      return ''
  }
})
