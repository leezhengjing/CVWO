import React from 'react';
import logo from './logo.svg';
import "./App.scss";
import Nav from './components/Nav';
import Menu from './components/Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import Register from './pages/Register';
import Login from './pages/Login';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import Roles from './pages/roles/Roles';
import RoleCreate from './pages/roles/RoleCreate';
import RoleEdit from './pages/roles/RoleEdit';
import Posts from './pages/posts/Posts';
import PostCreate from './pages/posts/PostCreate';
import { Threads } from './pages/threads/Threads';
import ThreadCreate from './pages/threads/ThreadCreate';
import PostEdit from './pages/posts/PostEdit';
import Profile from './pages/Profile';
import Post from './pages/posts/Post';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/roles/create" element={<RoleCreate />} />
          <Route path="/roles/:id/edit" element={<RoleEdit />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<PostCreate />} />
          <Route path="/posts/threads/:id/" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
          <Route path="/threads" element={<Threads />} />
          <Route path="/threads/create" element={<ThreadCreate />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
