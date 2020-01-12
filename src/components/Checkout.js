import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import api from '../service/api'
import { minusSvg, plusSvg, closeSvg } from '../styles/svg'

class Checkout extends React.Component {
  checkoutProductsEvent = () => {
    fetch(api.checkout)
      .then(res => res.json())
      .then(res => {
        switch (res.msg) {
          case 'SUCCESS':
            alert('SUCCESS')
            return
          default:
            return
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const {
      selectProducts,
      selectedProducts,
      selectedTotalNum,
      allPrice,
      checkPromoCode
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
              handleClickEvent={() => selectProducts(el.sku, 'DEC')}
            />
            <div className="checkout__row-num">{el.selectedNum}</div>
            <Button
              content={plusSvg}
              handleClickEvent={() => selectProducts(el.sku, 'INC')}
            />
            <div className="checkout__row-price">{el.price}</div>
            <Button
              content={closeSvg}
              handleClickEvent={() => selectProducts(el.sku, 'REMOVE')}
            />
          </div>
        ))}

        <div className="checkout__row">
          <div>Promo Code:</div>
          <input type="text" className="checkout__check-input" />
          <button className="checkout__check-button" onClick={checkPromoCode}>
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
          onClick={this.checkoutProductsEvent}
        >
          Checkout
        </button>
      </div>
    )
  }
}

export default Checkout
