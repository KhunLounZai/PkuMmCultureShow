import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import Robot3D from '../components/Robot3D';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 mx-4 rounded-3xl z-0 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-100/20 to-red-100/20" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left">
            <img
              src="/images/logo.png"
              alt="平台 Logo"
              className="w-20 h-20 md:w-28 md:h-28 rounded-full opacity-80 pointer-events-none select-none flex-shrink-0"
            />
            <div>

              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                {t('home.title')}
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                {t('home.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <Link
                  to="/recommendations"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t('home.startExploring')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section + AI Robot */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t('home.featuresTitle')}</h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              {t('home.featuresDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
              <div className="text-lg mb-1">📮</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">{t('home.features.postcards.title')}</h3>
              <p className="text-xs text-gray-600">{t('home.features.postcards.description')}</p>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
              <div className="text-lg mb-1">🗺️</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">{t('home.features.map.title')}</h3>
              <p className="text-xs text-gray-600">{t('home.features.map.description')}</p>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
              <div className="text-lg mb-1">🎥</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">{t('home.features.videos.title')}</h3>
              <p className="text-xs text-gray-600">{t('home.features.videos.description')}</p>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-sm border border-gray-100">
              <div className="text-lg mb-1">✈️</div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs">{t('home.features.flight.title')}</h3>
              <p className="text-xs text-gray-600">{t('home.features.flight.description')}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Robot3D />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;