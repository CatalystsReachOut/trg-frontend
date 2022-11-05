import React from 'react'

const Action = () => {
  return (
    <div className='flex gap-3'>
      <button onClick={()=>console.log('a')}>a</button>
      <button onClick={()=>console.log('b')}>b</button>
    </div>
  )
}

export default Action