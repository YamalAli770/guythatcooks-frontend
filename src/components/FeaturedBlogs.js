import React from 'react'
import Featured from './Featured'

const FeaturedBlogs = () => {
  return (
    <main className="featured-blogs-section">
      <div className="filter-by-category">
        <h1>Search By Cuisines</h1>
        <div className="filter-category-input-container">
          <input type="text" name="" id="" />
          <button>Search</button>
        </div>
      </div>
      <div className="featured-blogs-container">
        <Featured />
      </div>
    </main>
  )
}

export default FeaturedBlogs