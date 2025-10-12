import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Video, Star } from 'lucide-react';
import Robot3D from '../components/Robot3D';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Star,
      title: t('nav.recommendations'),
      description: t('recommendations.subtitle'),
      link: '/recommendations',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: t('nav.map'),
      description: t('map.subtitle'),
      link: '/map',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Video,
      title: t('nav.videos'),
      description: t('videos.subtitle'),
      link: '/videos',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('home.title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/recommendations"
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('home.startExploring')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('home.welcome')}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {t('home.description')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-4">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-3`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* AI Chat Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {t('home.meetMianMian')}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                🤖 遇见缅缅AI机器人！它会在网页中陪伴您探索缅甸文化，为您提供智能导览和个性化建议。
              </p>
            </div>
            <div className="transform scale-90">
              <Robot3D />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;