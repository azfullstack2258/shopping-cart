import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchProducts, selectProducts } from '../actions'
import { getProducts, getSelectedTotalNum } from '../reducers/selectors.reducer'

class ProductsContainer extends React.Component {
  render() {
    let { products, selectedTotalNum, selectProducts } = this.props
    return (
      <div>
        <h1>Products</h1>
        <Link to="/checkout">Cart {selectedTotalNum}</Link>
        {products.map(el => (
          <div key={el.sku}>
            {el.name}${el.price}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => selectProducts(el.sku, 'INC')}
            >
              +
            </span>
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchProducts()
  }
}

const mapStateToProps = state => ({
  products: getProducts(state),
  selectedTotalNum: getSelectedTotalNum(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchProducts,
      selectProducts
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
