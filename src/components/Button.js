import React from 'react'
import '../styles/components/Button.scss'

const Button = props => {
  const { content, handleClickEvent } = props
  return (
    <button className="button" onClick={handleClickEvent}>
      {content}
    </button>
  )
}

export default Button
