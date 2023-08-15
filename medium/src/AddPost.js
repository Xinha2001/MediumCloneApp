import React, { useState,useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './AddPost.css';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
   
  const headers = {
    'authToken': jwtToken,
  };
  useEffect(()=>{
    if(!jwtToken)
    {
        navigate('/login');

    }

  })
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, 'filename.jpg', { charset: 'utf-8' });
   
    axios.post('http://127.0.0.1:3000/upload',formData,{headers}).then((response)=>{
        setImageFile(response.data.file_url);
    })
    .catch((error)=>{
        console.log("hello");
        console.error(error);
    })
    setImageFile(file);
  };
  
  const handleSave = () => {
    const postData = {
        title: title,
        topic: topic,
        text: text,
        author_id:1,
        featured_image:imageFile
      };


    axios.post('http://127.0.0.1:3000/create/post', postData,{headers})
      .then((response) => {
        console.log('Post saved!', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error saving post:', error);
        
      });
      navigate('/');
  };

  const handleSaveDraft = () => {
    const postData = {
        title: title,
        topic: topic,
        text: text,
        author_id:1,
        featured_image:imageFile
      };


    axios.post('http://127.0.0.1:3000/draft/create', postData,{headers})
      .then((response) => {
        console.log('Post saved!', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error saving post:', error);
        // Implement error handling logic here
      });
      navigate('/');
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    
    <div className='add-post-button-wrapper'>
      <button className="add-post-button" onClick={handleModalOpen}>
        ADD POST
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleModalClose}>
              Close
            </button>
            <div className="add-post-container">
              <div className="form-group-inline">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="form-group-inline">
                <input type="text" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>

              <div className="form-group-inline">
                <label>Featured Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              <div className="form-group">
                <textarea value={text} placeholder="Text" onChange={(e) => setText(e.target.value)} />
              </div>
              <div className="save-buttons">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="save-button" onClick={handleSaveDraft}>
                  Save As Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default AddPost;
