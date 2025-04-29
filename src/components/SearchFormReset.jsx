"use client"
import React from 'react'
import Link from 'next/link'
import {X} from 'lucide-react'


const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') ;

        if(form) form.reset();
    }

  return (
    <div>
        <button type="reset" onClick={reset}>
            <Link href="/" className='search-btn'>
                <X className='size-6'/>     
            </Link>
        </button>
    </div>
  )
}

export default SearchFormReset
