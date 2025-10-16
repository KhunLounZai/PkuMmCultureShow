import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, MapPin, Video, Star, Globe } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  const navTabs = [
    { path: '/', name: '首页' },
    { path: '/recommendations', name: '推荐页面' },
    { path: '/journey', name: '旅程页面' },
    { path: '/a', name: '虚拟旅行' }
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/recommendations', icon: Star, label: t('nav.recommendations') },
    { path: '/map', icon: MapPin, label: t('nav.map') },
    { path: '/videos', icon: Video, label: t('nav.videos') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white font-bold text-xl">缅缅Ai : 城市明信片推荐与虚拟视频旅游</span>
            </Link>

            {/* Navigation removed (replaced by global bottom div nav) */}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">
                {i18n.language === 'zh' ? 'EN' : '中文'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation removed (replaced by global bottom div nav) */}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* 全局页面切换导航 */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-1">
          {navTabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === tab.path
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;