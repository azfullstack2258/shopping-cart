import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getPrices,
  getCheckoutStatus,
  getCartItemsInfo,
  getPromoCodeStatus
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
  constructor (props) {
    super(props)
    this.state = { promoCode: '' }

    this.handleCheckoutRequest = this.handleCheckoutRequest.bind(this)
  }

  handleRemoveFromCart (sku) { return this.props.removeFromCart(sku) }
  handleAddToCart (sku) { return this.props.addToCart(sku) }
  handleClearFromCart (sku) { return this.props.clearFromCart(sku) }
  handleCheckoutRequest () {
    const { cartItemsInfo, checkoutRequest } = this.props
    return checkoutRequest(
      cartItemsInfo.map(item => ({ sku: item.sku, quantity: item.count }))
    )
  }

  componentDidUpdate (prevProps) {
    const { checkoutStatus: { msg } } = this.props
    if (msg && msg !== prevProps.checkoutStatus.msg) {
      const { cartReset } = this.props
      alert(msg)
      cartReset()
    }
  }

  render () {
    const {
      cartItemsInfo,
      cartItemsCount,
      prices,
      applyPromoCode,
      promoCodeStatus,
      checkoutStatus
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
        {
          cartItemsInfo.map(el => (
            <div key={el.sku} className="checkout__row">
              <div className="checkout__row-name">{el.name}</div>
              <Button
                content={minusSvg}
                onClick={() => this.handleRemoveFromCart(el.sku)}
              />
              <div className="checkout__row-num">{el.count}</div>
              <Button
                content={plusSvg}
                onClick={() => this.handleAddToCart(el.sku)}
              />
              <div className="checkout__row-price">{el.price}</div>
              <Button
                content={closeSvg}
                onClick={() => this.handleClearFromCart(el.sku)}
              />
            </div>
          ))
        }

        <div className="checkout__row">
          <div className={promoCodeStatus.errors ? 'error' : ''}>Promo Code:</div>
          <input type="text" className="checkout__check-input" onChange={(event) => this.setState({ promoCode: event.target.value })}/>
          <button className="checkout__check-button" onClick={() => applyPromoCode(this.state.promoCode)}>
            Apply
          </button>
        </div>

        {
          priceList.map(el => (
            <div key={el.name} className="checkout__row">
              {el.name}: {el.price}
            </div>
          ))
        }

        {
          checkoutStatus.errors &&
            checkoutStatus.errors.map((error, i) => {
              const { field, msg } = error
              return (
                <div className="error" key={i}>
                  <span className="error__field">{ field }: </span>
                  <span className="error__msg">{ msg }</span>
                </div>
              )
            })
        }
        <button
          className="checkout__checkout-button"
          onClick={this.handleCheckoutRequest}
        >
          Checkout
        </button>
      </div>
    )
  }
}

Checkout.propTypes = {
  cartItemsCount: PropTypes.number,
  prices: PropTypes.object,
  cartItemsInfo: PropTypes.array,
  checkoutStatus: PropTypes.object,
  promoCodeStatus: PropTypes.object,
  applyPromoCode: PropTypes.func,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  clearFromCart: PropTypes.func,
  checkoutRequest: PropTypes.func,
  cartReset: PropTypes.func
}

const mapStateToProps = state => ({
  prices: getPrices(state),
  cartItemsInfo: getCartItemsInfo(state),
  checkoutStatus: getCheckoutStatus(state),
  promoCodeStatus: getPromoCodeStatus(state)
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
