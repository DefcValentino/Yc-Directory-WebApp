import React from 'react'
import Navbar from '../components/Navbar'

export default  function layout({children}) {
  return (
    <div className='bg-white h-screen'>
        <Navbar/>
      {children}
    </div>
  )
}

