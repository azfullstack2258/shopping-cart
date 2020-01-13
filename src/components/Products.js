import React from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import '../styles/layouts/Products.scss'
import { plusSvg } from '../styles/svg'

const Products = props => {
  const { selectedTotalNum, products, selectProducts } = props
  return (
    <div className="products">
      <div className="products__header">
        <h1 className="products__title">Products</h1>
        <Link to="/checkout" className="products__cart">
          Cart {selectedTotalNum}
        </Link>
      </div>
      {products.map(el => (
        <div key={el.sku} className="products__row">
          <div className="products__row-name">{el.name}</div>
          <div className="products__row-price">${el.price}</div>
          <Button
            content={plusSvg}
            handleClickEvent={() => selectProducts(el, 'INC')}
          />
        </div>
      ))}
    </div>
  )
}

export default Products
