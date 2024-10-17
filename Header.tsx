import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Heart size={24} />
          <span className="text-xl font-bold">{t('appName')}</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">{t('home')}</Link></li>
            <li><Link to="/prescription" className="hover:text-blue-200">{t('getPrescription')}</Link></li>
            <li><Link to="/nearby" className="hover:text-blue-200">{t('nearbyLocations')}</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;