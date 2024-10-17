import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Prescription: React.FC = () => {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState('');
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/prescription', { symptoms });
      setPrescription(response.data.prescription);
    } catch (error) {
      console.error('Error fetching prescription:', error);
      setPrescription(t('prescriptionError'));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('getPrescription')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="symptoms" className="block mb-2">{t('enterSymptoms')}</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? t('generating') : t('generatePrescription')}
        </button>
      </form>
      {prescription && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">{t('yourPrescription')}</h3>
          <div className="bg-white p-4 rounded shadow">
            <p>{prescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescription;