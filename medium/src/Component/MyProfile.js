import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MyProfile.css';
import MyPost from './MyPost'; 
import axios from 'axios';

const MyProfile = () => {
  const [aboutText, setAboutText] = useState('');
  const [authorDetails, setAuthorDetails] = useState('');

  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    'authToken': jwtToken
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/author/my/details', { headers })
      .then((response) => {
        setAuthorDetails(response.data);
        setAboutText(response.data.about || localStorage.getItem('authorBio') || ''); // Load from local storage or API response
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  
  const handleAboutSubmit = () => {
    
    localStorage.setItem('authorBio', aboutText);
    console.log('Bio updated:', aboutText);
  };

  return (
    <div className="author-profile">
      <div className="two-column-layout">
        <div
          className="author-details"
          style={{
            backgroundImage: `url('assets/post/8.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
          }}
        >
          <div className="author-header">
          </div>
          <div className="author-info">
            <div className="author-avatar">
              <img
                className="profileUserImg"
                src="assets/person/1.jpeg"
                alt=""
              />
            </div>
            <div className="author-bio">
              <h1>{authorDetails.name}</h1>
              <p>{aboutText || "Name"}</p>
              <h3>Contact Information</h3>
              <p>Email: {authorDetails.email}</p>
            </div>
          </div>
        </div>
        <div className="author-edit">
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Edit bio"
          />
          <button onClick={handleAboutSubmit}>Save Bio</button>
        </div>
        <div className="my-post-column">
          <MyPost />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;