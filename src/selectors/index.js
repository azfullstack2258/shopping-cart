import { createSelector } from 'reselect'

export const getCart = state => state.cartReducer
export const getProducts = state => state.productReducer
export const getSelectedProducts = state => state.cartReducer.selectedProducts

export const getSelectedTotalNum = createSelector(getSelectedProducts, selectedProducts =>
  selectedProducts.reduce((acc, cur) => acc + cur.selectedNum, 0)
)

export const getProductsFromCart = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) => {
    return [
      ...selectedProducts.map(selectedProduct => {
        return {
          ...products.find(product => product.sku === selectedProduct.sku),
          selectedNum: selectedProduct.selectedNum
        }
      })
    ]
  }
)

export const getSubTotalOfSelectedProducts = createSelector(
  getSelectedProducts,
  getProducts,
  (selectedProducts, products) =>
    selectedProducts
      .reduce((acc, cur) => {
        const res = products.filter(el => el.sku === cur.sku)
        const price = res.length ? res[0].price : 0
        return acc + price * cur.selectedNum
      }, 0)
      .toFixed(2)
)

export const getPromoAmount = (state, subTotal) => {
  const { discounttype, amount } = state.cartReducer.promoCode

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

export const getCheckoutCartStatus = createSelector(getCart, item => {
  switch (item.msg) {
    case 'SUCCESS':
      return 'SUCCESS'
    default:
      return ''
  }
})
