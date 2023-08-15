import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AuthorProfile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuthorProfile = () => {
  const { authorId } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [posts, setPosts] = useState([]);
  const [authorDetails, setAuthorDetails] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/get/post/author/${authorId}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });

    axios.get(`http://127.0.0.1:3000/author/details/${authorId}`)
      .then((response) => {
        setAuthorDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching author details:', error);
      });
  }, []);

  return (
    <div className="author-profile">
      <div className="author-header">
        <h2>{authorDetails.name}</h2>
        <div className="author-image">
          <img src="path_to_author_image.jpg" alt={authorDetails.name} />
        </div>
      </div>
      <div className="author-content">
        <div className={activeTab === 'about' ? '' : 'hidden'}>
          <div className="author-container">
            <div className="author-bio">
              <h1>{authorDetails.name}</h1>
              <p>{authorDetails.about || 'Bio'}</p>
              <h3>Contact Information</h3>
              <p>Email: {authorDetails.email}</p>
            </div>
          </div>
        </div>

        <div className={activeTab === 'about' ? 'hidden' : ''}>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-details">
                <h3>{post.title}</h3>
                <p >Topic: {post.topic}</p>
              
                <Link to={`/post/${post.id}`}>View Details</Link>
              </div>
              <img src={post.image} alt={post.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;