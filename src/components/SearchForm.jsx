import React from 'react'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'


const SearchForm = ({query}) => {
    
  return (
    <form className='search-form' action="/" scroll={false}>
      <input 
        type="text" 
        name="query" 
        defaultValue={query}
        placeholder="Search for a startup"
        className='search-input'
      />


      <div className='flex gap-2'>
        {query && <SearchFormReset/>}
        <button type='submit' className='search-btn cursor-pointer'>
          <Search className='size-6'/>
        </button>

      </div>
    </form>
  )
}

export default SearchForm
