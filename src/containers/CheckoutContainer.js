import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSelectedProducts } from '../reducers/selectors.reducer'
import { bindActionCreators } from 'redux'
import { checkPromoCode, selectProducts, checkoutProducts } from '../actions'

class CheckoutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0,
      promoPrice: 0,
      basketPrice: 0
    }
    const { selectedProducts } = this.props

    const totalPrice = selectedProducts
      .reduce((acc, cur) => acc + cur.price * cur.selectedNum, 0)
      .toFixed(2)

    const basketPrice = totalPrice - this.state.promoPrice
    this.state = {
      ...this.state,
      totalPrice,
      basketPrice
    }
  }

  initPrice = () => {
    const { selectedProducts } = this.props

    const totalPrice = selectedProducts
      .reduce((acc, cur) => acc + cur.price * cur.selectedNum, 0)
      .toFixed(2)

    let promoPrice
    let promoCode = this.props.price
    switch (promoCode.discounttype) {
      case 'percent':
        promoPrice = (totalPrice * promoCode.amount) / 100
        break
      default:
        promoPrice = 0
    }

    const basketPrice = totalPrice - promoPrice
    this.setState({
      totalPrice,
      promoPrice,
      basketPrice
    })
  }

  checkPromoCodeEvent = () => {
    let { checkPromoCode } = this.props
    checkPromoCode('adsf')
    setImmediate(() => {
      let promoCode = this.props.price
      let promoPrice
      switch (promoCode.discounttype) {
        case 'percent':
          promoPrice = (this.state.totalPrice * promoCode.amount) / 100
          break
        default:
          promoPrice = 0
      }

      const basketPrice = this.state.totalPrice - promoPrice

      this.setState({
        promoPrice,
        basketPrice
      })
    }, 0)
  }

  handleClickProducts = (id, mode) => {
    this.props.selectProducts(id, mode)
    setImmediate(() => this.initPrice(), 0)
  }

  checkoutEvent = () => {
    let { checkoutProducts } = this.props
    checkoutProducts({ baskets: '' })
    setImmediate(() => {
      let { checkoutProductsStatus } = this.props
      switch (checkoutProductsStatus.msg) {
        case 'SUCCESS':
          alert('Success')
          break
        default:
          alert('Fail')
      }
    }, 0)
  }

  render() {
    let { selectedProducts } = this.props

    return (
      <div>
        <Link to="/">Products</Link>
        {selectedProducts.map(el => (
          <div key={el.sku}>
            {el.name}
            {el.selectedNum}
            {el.price}
            <span
              onClick={() => this.handleClickProducts(el.sku, 'DEC')}
              style={{ margin: '25px', cursor: 'pointer' }}
            >
              -
            </span>
            <span
              onClick={() => this.handleClickProducts(el.sku, 'INC')}
              style={{ margin: '25px', cursor: 'pointer' }}
            >
              +
            </span>
            <span
              onClick={() => this.handleClickProducts(el.sku, 'REMOVE')}
              style={{ margin: '25px', cursor: 'pointer' }}
            >
              *
            </span>
          </div>
        ))}
        <div>
          Promo Code:
          <input type="text" />
          <button onClick={this.checkPromoCodeEvent}>Apply</button>
        </div>
        <div>Sub Total: ${this.state.totalPrice}</div>
        <div>Promo Amount: ${this.state.promoPrice}</div>
        <div>Basket Total: ${this.state.basketPrice}</div>
        <button onClick={this.checkoutEvent}>Checkout</button>
      </div>
    )
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
}

const mapStateToProps = state => ({
  selectedProducts: getSelectedProducts(state),
  price: state.promoCode,
  checkoutProductsStatus: state.checkoutProducts
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      selectProducts,
      checkPromoCode,
      checkoutProducts
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
