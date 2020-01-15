import React from 'react'
import PropTypes from 'prop-types'
import '../styles/components/Button.scss'

const Button = ({ content, onClick }) => (
  <button className="button" onClick={onClick}>
    {content}
  </button>
)

Button.propTypes = {
  content: PropTypes.string,
  onClick: PropTypes.func
}
export default Button
