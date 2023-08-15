import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState('false');
  const [isFollow, setIsFollow] = useState('false');
  const [ isSaved, setIsSaved ] = useState('false');
  const [isComment,setIsComment]=useState('false');
  const [readTime, setReadTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const jwtToken = localStorage.getItem('jwtToken');
  var flag=false;
  
  const headers = {
    'authToken': jwtToken
  };

  useEffect(() => {
    async function fetchMainData() {
      try {
        await axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
        .then((response) => {
          setPosts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
  
        });
      } catch (error) {
        console.error('Error fetching main API data:', error);
      }
    }

    fetchMainData();
  }, []);


  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/like/already/liked?post_id=${postId}`,{headers})
      .then((response) => {
        console.log("checklikedlogging");
        setIsLiked(response.data.success);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("checklikedlogging");
        console.error('Error fetching posts:', error);
      });
  }, [isLiked])


  useEffect(() => {

   
    axios.get(` http://127.0.0.1:3000/comment/all/${postId}`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
    axios.get(`http://127.0.0.1:3000/check/follow/${post.author_id}`, {}, {headers})
      .then((response) => {
        console.log("Checking Follow");
        setIsFollow(response.data.success);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });

  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      setReadTime(elapsedSeconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const dateTimeString = post.published_at;

  const dateObj = new Date();


  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [newComment, setNewComment] = useState('');


  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const handleDislike = () => {
    axios.delete(`http://127.0.0.1:3000/like/remove/${postId}`,{headers})
      .then((response) => {
        setIsLiked(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  const handleLike = () => {

    axios.post(`http://127.0.0.1:3000/like/create/${postId}`,{},{headers})
      .then((response) => {
        setIsLiked(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  const openCommentPopup = () => {
    setShowCommentPopup(true);
  };
  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setNewComment('');
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment) {
      const Comment = {
        post_id: postId,
        text: newComment
      }
      setNewComment('');

      axios.post('http://127.0.0.1:3000/comment/create', Comment, { headers })
        .then((response) => {
          console.log("commented");
          // setComments(response.data);
          setIsComment(true);
          flag=true;
          console.log(response.data);
        })
        .catch((error) => {
          console.log('cannot put there');
          console.error('Error fetching posts:', error);

        });
      axios.get(` http://127.0.0.1:3000/comment/all/${postId}`)
        .then((response) => {
          setComments(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);

        });



    }

  };
  const handleFollow = () => {
    
    axios.post(`http://127.0.0.1:3000/author/follow/${post.author_id}`,{},{headers})
      .then((response) => {
        setIsFollow((prev)=>!prev);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(headers);
        console.log('cannot put there');
        console.error('Error fetching posts:', error);

      });


  }

  const handleSavePost = () => {
    axios.post(`http://127.0.0.1:3000/author/saveForLater/${postId}`, {}, { headers })
      .then((response) => {
        console.log(response.data);
        setIsSaved(false);
      })
      .catch((error) => {
        console.log('cannot put there');
        console.error('Error fetching posts:', error);

      });

      const handleLike = () => {
        if (!isLiked) {
          // Like the post
          axios.post(`http://127.0.0.1:3000/like/create/${postId}`, {}, { headers })
            .then((response) => {
              setIsLiked(true);
              alert('Post liked'); // Show an alert when the post is liked
              console.log(response.data);
            })
            .catch((error) => {
              console.error('Error fetching posts:', error);
            });
        } else {
          // Unlike the post
          axios.delete(`http://127.0.0.1:3000/like/remove/${postId}`, { headers })
            .then((response) => {
              setIsLiked(false);
              console.log(response.data);
            })
            .catch((error) => {
              console.error('Error fetching posts:', error);
            });
        }
      };

  }
  return (
    <div className="article-container">
      <div className="article-box">
        <div className="main-content">
        <div className="centered-content">
          <h3 className="article-title">{post.title}</h3>
          <p className="article-meta">{post.topic}</p>
        </div>
          <div className='author-container'>
            <div className='top-container'>
              
              <a href={`/authorprofile/${post.author_id}`} className='author'>{post.author_name}</a>
              <a onClick={handleFollow} className={`follow-button ${isFollow ? 'following' : ''}`}>
  {isFollow ? 'Following' : 'Follow'}
</a>
            </div>
            <div className='bottom-container'>
              <button onClick={handleLike} className={`like-button ${isLiked ? 'liked' : ''}`}>
              {isLiked ? 'Liked' : 'Like'}
            </button>
              {
                isSaved ? <i onClick={handleSavePost} className="bi bi-bookmark"></i> : <i className="bi bi-bookmark-fill"></i>
              }
            </div>
          </div>
          <div className="time-container">
          <p className="read-time">Read time: {readTime} seconds</p>
          <p className='published-at'>{formattedDate}</p> 
        </div>
          <div className="centered-image-container">
            <img src={post.image} alt={post.title} height={200} width={185} className="centered-image" />
          </div>
          <p className='post-text'>{post.text}</p>
        </div>
        
        <div className="comments-container">
          <h4>Comments</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="comment-box">
                <p className="comment-author">{comment.author_name}</p>
                <p className="comment-date">{comment.comment_date}</p>
                <p className="comment-text">{comment.text}</p>
              </li>
            ))}
          </ul>
          <textarea
            rows="4"
            cols="50"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Enter your comment..."
          />
          <button onClick={handleSubmitComment}>Submit</button>
        </div>

        
      </div>
    </div>
  );
};

export default PostDetail;
