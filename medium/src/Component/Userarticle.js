
import './Userarticle.css';
import React, { useState, useEffect } from 'react';


const Userarticle = () => {
  const article = {
    title: "The Science behind movies",
    authorName: "John Doe",
    heading: "Building Engaging User Interfaces",
    content: `Fiview content tck-market in films, the figures become truly staggering.
    
    Contemporary research has also revealed more profound aspects to film’s impact on society. In a 2005 paper by S C Noah Uhrig (University of Essex, UK) entitled, “‘Cinema is Good for You: The Effects of Cinema Attendance on Self-Reported Anxiety or Depression and ‘Happiness'” the author describes how, “The narrative and representational aspects of film make it a wholly unique form of art. Moreover, the collective experience of film as art renders it a wholly distinct leisure activity. The unique properties of attending the cinema can have decisively positive effects on mental health. Cinema attendance can have independent and robust effects on mental wellbeing because visual stimulation can queue a range of emotions and the collective experience of these emotions through the cinema provides a safe environment in which to experience roles and emotions we might not otherwise be free to experience. The collective nature of the narrative and visual stimulation makes the experience enjoyable and controlled, thereby offering benefits beyond mere visual stimulation. Moreover, the cinema is unique in that it is a highly accessible social art form, the participation in which generally cuts across economic lines..`,
  };
  const [elapsedTime, setElapsedTime] = useState(0);
  const [tagInput, setTagInput] = useState('');
  const [savedTags, setSavedTags] = useState([]);

  // Function to update elapsed time
  const updateElapsedTime = () => {
    setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
  };

  useEffect(() => {
    // Start the timer when the component is mounted
    const intervalId = setInterval(updateElapsedTime, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle tag input change
  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  // Function to handle saving a tag
  const handleSaveTag = () => {
    if (tagInput.trim() !== '') {
      setSavedTags([...savedTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div>
      <div className="article-container">
        <div className="article-box">
          <div className="timer-container">
            <span className="timer">{`${Math.floor(elapsedTime / 60)}:${elapsedTime % 60}`}</span>
          </div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="author-name">{article.authorName}</span>
          </div>
          <h2 className="article-heading">{article.heading}</h2>
          <p className="article-content">{article.content}</p>
          
          <div className="tags-container">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              placeholder="Enter tags"
              className="tags-input"
            />
            <button onClick={handleSaveTag} className="tags-button">
              Save
            </button>
            <div className="saved-tags">
              {savedTags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userarticle;