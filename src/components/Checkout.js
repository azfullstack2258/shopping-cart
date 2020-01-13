import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getAllPrice,
  getcheckoutCartStatus,
  getSelectedProducts
} from '../selectors'
import {
  checkoutCartRequest,
  applyPromoCode,
  addToCart,
  removeFromCart,
  clearFromCart,
  checkoutCartReset
} from '../redux/actions'
import Button from './Button'
import { minusSvg, plusSvg, closeSvg } from '../styles/svg'
import '../styles/layouts/Checkout.scss'

class Checkout extends React.Component {
  render() {
    const {
      addToCart,
      removeFromCart,
      clearFromCart,
      selectedProducts,
      selectedTotalNum,
      allPrice,
      applyPromoCode,
      checkoutCartRequest
    } = this.props

    const priceList = [
      { name: 'Sub Total', price: allPrice.subTotal },
      { name: 'Promo Amount', price: allPrice.promoAmount },
      { name: 'Basket Total', price: allPrice.basketTotal }
    ]

    return (
      <div className="checkout">
        <div className="checkout__header">
          <Link to="/" className="checkout__prev">
            &lt;
          </Link>
          <h1 className="checkout__title">Checkout</h1>
          <div className="checkout__cart">Chart {selectedTotalNum}</div>
        </div>

        {selectedProducts.map(el => (
          <div key={el.sku} className="checkout__row">
            <div className="checkout__row-name">{el.name}</div>
            <Button
              content={minusSvg}
              handleClickEvent={() => removeFromCart(el)}
            />
            <div className="checkout__row-num">{el.selectedNum}</div>
            <Button content={plusSvg} handleClickEvent={() => addToCart(el)} />
            <div className="checkout__row-price">{el.price}</div>
            <Button
              content={closeSvg}
              handleClickEvent={() => clearFromCart(el)}
            />
          </div>
        ))}

        <div className="checkout__row">
          <div>Promo Code:</div>
          <input type="text" className="checkout__check-input" />
          <button className="checkout__check-button" onClick={applyPromoCode}>
            Apply
          </button>
        </div>

        {priceList.map(el => (
          <div key={el.name} className="checkout__row">
            {el.name}: {el.price}
          </div>
        ))}
        <button
          className="checkout__checkout-button"
          onClick={checkoutCartRequest}
        >
          Checkout
        </button>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      if (this.props.checkoutCartStatus === 'SUCCESS') {
        alert('SUCCESS')
        this.props.checkoutCartReset()
      }
    }
  }
}

const mapStateToProps = state => ({
  allPrice: getAllPrice(state),
  selectedProducts: getSelectedProducts(state),
  checkoutCartStatus: getcheckoutCartStatus(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      applyPromoCode,
      addToCart,
      removeFromCart,
      clearFromCart,
      checkoutCartRequest,
      checkoutCartReset
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
