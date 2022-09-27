import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Featured from './Featured'

const FeaturedBlogs = () => {
  const navigate = useNavigate();
  const [cuisine, setCuisine] = useState();
  const searchCuisine = () => {
    cuisine && navigate(`/search?cuisine=${cuisine}`)
  };
  return (
    <main className="featured-blogs-section">
      <div className="filter-by-category">
        <h1>Search By Cuisines</h1>
        <div className="filter-category-input-container">
          <input type="text" name="searched-cuisine" id="searched-cuisine" placeholder='Search Cuisine, eg: Chinese' value={cuisine} onChange={(e) => setCuisine(e.target.value)}  />
          <button onClick={searchCuisine}>Search</button>
        </div>
      </div>
      <div className="featured-blogs-container">
        <Featured />
      </div>
    </main>
  )
}

export default FeaturedBlogs