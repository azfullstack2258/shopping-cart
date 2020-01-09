export const getProducts = state => state.products

export const getSelectedTotalNum = state =>
  state.products.reduce((acc, cur) => acc + cur.selectedNum, 0)

export const getSelectedProducts = state =>
  state.products.filter(el => el.selectedNum !== 0)
