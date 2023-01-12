import React from 'react'
import { Button } from 'antd'

const Btn = ({
  title,
  onClick,
  className,
  type,
  loading
}) => {


  return (
    <Button loading={loading} className={`min-w-[60px] h-auto p-2 rounded-lg ${type === 1 ? 'btn-primary' : 'btn-secondary'} transition ${className}`} onClick={onClick}>{title}</Button>
    // <></>
  )
}

Button.defaultProps = {
  type: 1
}

export default Btn