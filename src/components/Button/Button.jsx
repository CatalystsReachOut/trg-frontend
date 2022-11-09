import React from 'react'

const Button = (props) => {
  //props
  const {
    title,
    onClick,
    className,
    type,
    } = props;


  return (
    <button className={`min-w-[60px] p-2 rounded-lg ${type==1?'btn-primary':'btn-secondary'} transition ${className}`} onClick={onClick}>{title}</button>
  )
}

Button.defaultProps={
  type:1
}

export default Button