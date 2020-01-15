import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getPrices,
  getCheckoutStatusMsg,
  getCartItemsInfo
} from '../selectors'
import {
  checkoutRequest,
  applyPromoCode,
  addToCart,
  removeFromCart,
  clearFromCart,
  cartReset
} from '../redux/actions'
import Button from '../components/Button'
import { minusSvg, plusSvg, closeSvg } from '../styles/svg'
import '../styles/layouts/Checkout.scss'

class Checkout extends React.Component {
  render() {
    const {
      addToCart,
      removeFromCart,
      clearFromCart,
      cartItemsInfo,
      cartItemsCount,
      prices,
      applyPromoCode,
      checkoutRequest
    } = this.props

    const priceList = [
      { name: 'Sub Total', price: prices.subTotal },
      { name: 'Promo Amount', price: prices.promoAmount },
      { name: 'Basket Total', price: prices.basketTotal }
    ]

    return (
      <div className="checkout">
        <div className="checkout__header">
          <Link to="/" className="checkout__prev">
            &lt;
          </Link>
          <h1 className="checkout__title">Checkout</h1>
          <div className="checkout__cart">Chart {cartItemsCount}</div>
        </div>

        {cartItemsInfo.map(el => (
          <div key={el.sku} className="checkout__row">
            <div className="checkout__row-name">{el.name}</div>
            <Button
              content={minusSvg}
              handleClickEvent={() => removeFromCart(el.sku)}
            />
            <div className="checkout__row-num">{el.count}</div>
            <Button
              content={plusSvg}
              handleClickEvent={() => addToCart(el.sku)}
            />
            <div className="checkout__row-price">{el.price}</div>
            <Button
              content={closeSvg}
              handleClickEvent={() => clearFromCart(el.sku)}
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
          onClick={checkoutRequest}
        >
          Checkout
        </button>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      if (this.props.checkoutStatusMsg === 'SUCCESS') {
        alert('SUCCESS')
        this.props.cartReset()
      }
    }
  }
}

const mapStateToProps = state => ({
  prices: getPrices(state),
  cartItemsInfo: getCartItemsInfo(state),
  checkoutStatusMsg: getCheckoutStatusMsg(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      applyPromoCode,
      addToCart,
      removeFromCart,
      clearFromCart,
      checkoutRequest,
      cartReset
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
