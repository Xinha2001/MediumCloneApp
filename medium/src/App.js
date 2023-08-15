import './App.css';
import Navbar from './Component/Navbar';
import MainComponent from './Component/MainComponent';
import PostDetail from './Component/PostDetail';
import AddPost from './AddPost';
import EditPost from './EditPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import MyPost from './Component/MyPost';
import AuthorProfile from './Component/AuthorProfile';
import MyProfile from './Component/MyProfile';
import SavedPost from './Component/SavedPost';
import Draft from './Component/Drafts';
import Followers from './Component/Followers';
import Payment from './Component/Payment';
import Movies from './Component/Movies';
import Userarticle from './Component/Userarticle';
import Userarticleb from './Component/Userarticleb';
import Topbar from './Component/Topbar';


function App() {
  return (
    <Router>
      <div className='app'>
        <Topbar/>
        <Navbar />
        
        <div className="content">
          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/post/:postId/edit" element={<EditPost />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypost" element={<MyPost />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/savedpost" element={<SavedPost />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/authorprofile/:authorId" element={<AuthorProfile />} />
            <Route path="/movies" element={ <Movies/>} />
            <Route path="/userarticle" element={ <Userarticle/>} />
            <Route path="/userarticleb" element={ <Userarticleb/>} />
            <Route path="/national-affairs" element={ <Movies/>} />
            <Route path="/technology" element={ <Movies/>} />
            <Route path="/international-relationships" element={ <Movies/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
