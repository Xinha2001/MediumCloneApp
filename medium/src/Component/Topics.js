import React from 'react';
import './Topics.css'; 
import { useNavigate } from 'react-router-dom';

const fakeTopics = [
  { id: 1, title: 'Movies', slug: 'movies' },
  { id: 2, title: 'National Affairs', slug: 'national-affairs' },
  { id: 3, title: 'International relationships', slug: 'international-relationships' },
  { id: 4, title: 'Technology', slug: 'technology' },
];

function Topics() {
  const navigate = useNavigate();

  const handleTopicClick = (slug) => {
    // Navigate to the specific topic page based on the slug
    navigate(`/${slug}`);
  };
  
  return (
    <div className="topic-list">
      {fakeTopics.map(topic => (
        <div
          key={topic.id}
          className="topic-item"
          onClick={() => handleTopicClick(topic.slug)}
        >
          {topic.title}
        </div>
      ))}
    </div>
  );    
}

export default Topics;