import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyPost.css'
import axios from 'axios';

const MyPost = () => {

    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    const [change, setChange] = useState('false');
    useEffect(() => {

        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
    }, [change]);
    const handleDelete = (postId) => {

        axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`, { headers })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
    }

    return (
        <div>
            <div className="posts-container">

                {posts.map((post) => (
                    <div key={post.id} className="post">

                        <div className="post-details">
                            <h3>{post.title}</h3>
                            <p>Topic: {post.topic}</p>

                            <Link to={`/post/${post.id}`} className="post-button">View Details</Link>

                            <Link to={`/post/${post.id}/edit`} className="post-button">Edit</Link>
                            <button onClick={() => handleDelete(post.id)} className="post-button delete-button">Delete</button>


                        </div>
                        <img src={post.image} alt={post.title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPost;