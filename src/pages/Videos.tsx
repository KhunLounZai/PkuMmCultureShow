import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Clock, Eye, Heart, Filter } from 'lucide-react';
import Robot3D from '../components/Robot3D';

interface Video {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: 'cultural' | 'natural' | 'festival' | 'food';
  duration: string;
  views: number;
  thumbnail: string;
  videoUrl: string;
}

const Videos: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const videos: Video[] = [
    {
      id: '1',
      title: '蒲甘日出：千塔之城的壮丽景色',
      titleEn: 'Bagan Sunrise: Magnificent Views of the City of Thousand Pagodas',
      description: '体验蒲甘古城日出时分的神圣美景，热气球飞越千年佛塔群',
      descriptionEn: 'Experience the sacred beauty of Bagan at sunrise, hot air balloons over millennium-old pagodas',
      category: 'cultural',
      duration: '8:32',
      views: 125000,
      thumbnail: '/images/cities/bagan.jpg',
      videoUrl: '#'
    },
    {
      id: '2',
      title: '茵莱湖渔民：传统的独脚划船技艺',
      titleEn: 'Inle Lake Fishermen: Traditional Leg Rowing Techniques',
      description: '探索茵莱湖独特的渔民文化和传承千年的独脚划船技艺',
      descriptionEn: 'Explore the unique fishermen culture of Inle Lake and millennium-old leg rowing techniques',
      category: 'cultural',
      duration: '6:15',
      views: 89000,
      thumbnail: '/images/cities/inle-lake.jpg',
      videoUrl: '#'
    },
    {
      id: '3',
      title: '缅甸泼水节：欢乐的新年庆典',
      titleEn: 'Myanmar Water Festival: Joyful New Year Celebration',
      description: '感受缅甸最盛大的传统节日——泼水节的欢乐氛围',
      descriptionEn: 'Feel the joyful atmosphere of Myanmar\'s grandest traditional festival - the Water Festival',
      category: 'festival',
      duration: '10:45',
      views: 156000,
      thumbnail: '/images/cities/yangon.jpg',
      videoUrl: '#'
    },
    {
      id: '4',
      title: '缅甸美食之旅：从街头小吃到传统佳肴',
      titleEn: 'Myanmar Culinary Journey: From Street Food to Traditional Delicacies',
      description: '品尝缅甸丰富多样的美食文化，从鱼汤面到茶叶沙拉',
      descriptionEn: 'Taste Myanmar\'s rich and diverse food culture, from mohinga to tea leaf salad',
      category: 'food',
      duration: '12:20',
      views: 203000,
      thumbnail: '/images/cities/mandalay.jpg',
      videoUrl: '#'
    },
    {
      id: '5',
      title: '缅甸自然奇观：从雪山到海滩',
      titleEn: 'Myanmar Natural Wonders: From Snow Mountains to Beaches',
      description: '探索缅甸多样的自然景观，从北部雪山到南部海滩',
      descriptionEn: 'Explore Myanmar\'s diverse natural landscapes, from northern snow mountains to southern beaches',
      category: 'natural',
      duration: '15:30',
      views: 178000,
      thumbnail: '/images/cities/naypyidaw.jpg',
      videoUrl: '#'
    },
    {
      id: '6',
      title: '仰光大金塔：佛教圣地的神圣时刻',
      titleEn: 'Shwedagon Pagoda: Sacred Moments at the Buddhist Holy Site',
      description: '感受仰光大金塔的神圣氛围和佛教文化的深厚底蕴',
      descriptionEn: 'Feel the sacred atmosphere of Shwedagon Pagoda and the profound Buddhist culture',
      category: 'cultural',
      duration: '7:45',
      views: 142000,
      thumbnail: '/images/cities/bagan.jpg',
      videoUrl: '#'
    }
  ];

  const categories = [
    { id: 'all', label: t('videos.categories.all'), labelEn: 'All' },
    { id: 'cultural', label: t('videos.categories.cultural'), labelEn: 'Cultural' },
    { id: 'natural', label: t('videos.categories.natural'), labelEn: 'Natural' },
    { id: 'festival', label: t('videos.categories.festival'), labelEn: 'Festival' },
    { id: 'food', label: t('videos.categories.food'), labelEn: 'Food' }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t('videos.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            {t('videos.subtitle')}
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 max-w-3xl mx-auto">
            <p className="text-base text-purple-800">
              <span dangerouslySetInnerHTML={{ __html: t('videos.smartGuide') }} />
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter size={20} />
            <span className="font-medium">
              {t('videos.filterByCategory')}
            </span>
          </div>
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {i18n.language === 'zh' ? category.label : category.labelEn}
              </button>
            );
          })}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-white text-center">
                  <Play size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    {t('videos.playerPlaceholder')}
                  </p>
                  <p className="text-sm opacity-75 mt-2">
                    {i18n.language === 'zh' ? selectedVideo.title : selectedVideo.titleEn}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {i18n.language === 'zh' ? selectedVideo.title : selectedVideo.titleEn}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'zh' ? selectedVideo.description : selectedVideo.descriptionEn}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{formatViews(selectedVideo.views)} {t('videos.views')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={i18n.language === 'zh' ? video.title : video.titleEn}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                
                {/* Play Button */}
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300 shadow-lg">
                    <Play size={24} className="text-gray-800 ml-1" fill="currentColor" />
                  </div>
                </button>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(video.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    favorites.has(video.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart size={18} fill={favorites.has(video.id) ? 'currentColor' : 'none'} />
                </button>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {t(`videos.categories.${video.category}`)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                  {i18n.language === 'zh' ? video.title : video.titleEn}
                </h3>
                
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {i18n.language === 'zh' ? video.description : video.descriptionEn}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{formatViews(video.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{video.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVideo(video)}
                  className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <Play size={18} />
                  <span>{t('videos.watchVideo')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t('videos.noVideosFound')}
            </p>
          </div>
        )}
      </div>
      <Robot3D />
    </div>
  );
};

export default Videos;
