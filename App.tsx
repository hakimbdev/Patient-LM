import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Prescription from './pages/Prescription';
import NearbyLocations from './pages/NearbyLocations';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('en');

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/nearby" element={<NearbyLocations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;