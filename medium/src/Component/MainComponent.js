import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import './MainComponent.css';
import axios from 'axios';

import Topics from './Topics';
import AddPost from '../AddPost';


const MainComponent = () => {
  const [filters, setFilters] = useState({
    author: '',
    date: '',
    sortby:'',
    search: ''
  });
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/author/showAll')
      .then((response) => {
        setAuthors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });

  }, [])


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };





  return (
    <div className='topcontainer'>
     
     <AddPost/>
    <div className="main-container">
   
      <div className="left-container">
      <h3 className='recommendedtopics'>Recommended</h3>
        <Topics/>
        <div className='search'>
          <input className="search-bar" type="text" name="search" placeholder="Search Posts" value={filters.search} onChange={handleFilterChange} />
        </div>
      <div className="filters-search">
      
          <div className='filter1'>
            {/* Dropdown list for Author */}
            <select
              name="author"
              value={filters.author}
              onChange={handleFilterChange}
            >
              <option value=''>Filter by Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
           
          
            <div className='filter2'>
          <select value={filters.sortby} onChange={handleFilterChange}>
              <option value=''>Sort By</option>
              <option value="likes">Likes</option>
              <option value="comments">Comments</option>
            </select>
            
          </div>
          </div>
          

        </div>
        
        
      </div>
      <div className="right-container">
      <PostList filter={filters} />

      </div>
    </div>
    </div>
  );
};

export default MainComponent;
