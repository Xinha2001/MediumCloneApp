import React, { useState, useEffect } from 'react';
import './Moviesb.css';
import { Link } from 'react-router-dom';

const Moviesb = () => {
  const article = {
    title: "The Science behind movies",
    authorName: "John Doe",
    heading: "Building Engaging User Interfaces",
    content: `React has become one of the most popular JavaScript libraries for building user interfaces.
    It provides a component-based architecture that allows developers to create reusable and
    modular UI elements. This approach makes it easier to manage complex user interfaces and
    encourages code reusability.`,
  };

  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const wordsPerMinute = 200;
    const wordCount = article.content.split(/\s+/).length;
    const readingTimeInMinutes = wordCount / wordsPerMinute;
    setReadingTime(Math.ceil(readingTimeInMinutes));
  }, [article]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (newComment.trim() !== '') {
      const newComments = [...comments, newComment];
      setComments(newComments);
      setNewComment('');
    }
  };

  const handleSaveComment = () => {
    console.log('Comments saved:', comments);
  };

  return (
    <div>
      <div className="article-container">
        <div className="article-box">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="author-name">{article.authorName}</span>
            <span className="reading-time">{`${readingTime} min read`}</span>
          </div>
          <h2 className="article-heading">{article.heading}</h2>
          <p className="article-content">{article.content}</p>
          <div className="article-actions">
            <button
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <div className="comment-section">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button className="comment-button" onClick={handleComment}>
                Comment
              </button>
              {comments.length > 0 && (
                <div className="comment-list">
                  <div className="comment">{comments[comments.length - 1]}</div>
                </div>
              )}
            </div>
            <button className="save-comment-button" onClick={handleSaveComment}>
              Save Comments
            </button>
          </div>
          <div className="read-further-button-container">
          <Link to="/userarticleb" className="read-further-button">
              Read more
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Moviesb;