import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSelectedProducts } from '../reducers/selectors.reducer'
import { bindActionCreators } from 'redux'
import { selectProducts } from '../actions'

const CheckoutContainer = ({ selectedProducts, selectProducts }) => {
  const totalPrice = selectedProducts.reduce(
    (acc, cur) => acc + cur.price * cur.selectedNum,
    0
  )
  console.log(totalPrice)
  return (
    <div>
      <Link to="/">Products</Link>
      {selectedProducts.map(el => (
        <div key={el.sku}>
          {el.name}
          {el.selectedNum}
          {el.price}
          <span
            onClick={() => selectProducts(el.sku, 'DEC')}
            style={{ margin: '25px', cursor: 'pointer' }}
          >
            -
          </span>
          <span
            onClick={() => selectProducts(el.sku, 'INC')}
            style={{ margin: '25px', cursor: 'pointer' }}
          >
            +
          </span>
          <span
            onClick={() => selectProducts(el.sku, 'REMOVE')}
            style={{ margin: '25px', cursor: 'pointer' }}
          >
            *
          </span>
        </div>
      ))}
      <div>Sub Total: ${totalPrice}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProducts: getSelectedProducts(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      selectProducts
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
