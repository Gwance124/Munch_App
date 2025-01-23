// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import SwipePage from './pages/SwipePage';
import ExplorePage from './pages/ExplorePage';
import SocialPage from './pages/SocialPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<SwipePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
