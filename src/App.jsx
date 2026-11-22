import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import DemoToolbar from './components/DemoToolbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import ToursPage from './pages/ToursPage.jsx';
import TourDetailsPage from './pages/TourDetailsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import { storage } from './utils/storage.js';

export default function App() {
  const [hasActiveDraft, setHasActiveDraft] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const checkDraft = () => {
    const draft = storage.getBookingDraft();
    setHasActiveDraft(!!draft);
  };

  useEffect(() => {
    checkDraft();
  }, [refreshKey]);

  const handleToolbarStateChange = () => {
    checkDraft();
    setRefreshKey(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Evaluator Demo Controls (Task 6.1) */}
      <DemoToolbar onStateChange={handleToolbarStateChange} />

      {/* Main Header / Navigation */}
      <Navbar hasActiveDraft={hasActiveDraft} />

      {/* Page Routing */}
      <div style={{ flex: 1 }} key={refreshKey}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailsPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}
