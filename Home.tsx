import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">{t('welcomeMessage')}</h1>
      <p className="text-xl mb-8">{t('homeDescription')}</p>
      <div className="space-x-4">
        <Link to="/prescription" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {t('getPrescription')}
        </Link>
        <Link to="/nearby" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          {t('findNearbyLocations')}
        </Link>
      </div>
    </div>
  );
};

export default Home;