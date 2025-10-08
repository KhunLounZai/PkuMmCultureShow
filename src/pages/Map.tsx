import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Info, Star, Camera, TreePine, Mountain, Waves } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  nameEn: string;
  coordinates: { lat: number; lng: number };
  category: 'cultural' | 'natural' | 'adventure' | 'spiritual';
  description: string;
  descriptionEn: string;
  rating: number;
  image: string;
}

const Map: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const locations: MapLocation[] = [
    {
      id: '1',
      name: '蒲甘',
      nameEn: 'Bagan',
      coordinates: { lat: 21.1619, lng: 94.8708 },
      category: 'cultural',
      description: '拥有超过2000座古老佛塔的神圣之地',
      descriptionEn: 'Sacred land with over 2000 ancient pagodas',
      rating: 4.9,
      image: '/images/cities/bagan.jpg'
    },
    {
      id: '2',
      name: '茵莱湖',
      nameEn: 'Inle Lake',
      coordinates: { lat: 20.5167, lng: 96.9000 },
      category: 'natural',
      description: '独特的水上生活方式和浮动花园',
      descriptionEn: 'Unique water lifestyle with floating gardens',
      rating: 4.7,
      image: '/images/cities/inle-lake.jpg'
    },
    {
      id: '3',
      name: '仰光',
      nameEn: 'Yangon',
      coordinates: { lat: 16.8661, lng: 96.1951 },
      category: 'spiritual',
      description: '缅甸最大城市，拥有著名的大金塔',
      descriptionEn: 'Myanmar\'s largest city with the famous Shwedagon Pagoda',
      rating: 4.8,
      image: '/images/cities/yangon.jpg'
    },
    {
      id: '4',
      name: '曼德勒',
      nameEn: 'Mandalay',
      coordinates: { lat: 21.9588, lng: 96.0891 },
      category: 'cultural',
      description: '缅甸最后王朝的古都，文化中心',
      descriptionEn: 'Ancient capital of Myanmar\'s last dynasty, cultural center',
      rating: 4.5,
      image: '/images/cities/mandalay.jpg'
    },
    {
      id: '5',
      name: '蒲甘山',
      nameEn: 'Mount Popa',
      coordinates: { lat: 20.9167, lng: 95.2500 },
      category: 'adventure',
      description: '神圣的火山，冒险者的天堂',
      descriptionEn: 'Sacred volcano, paradise for adventurers',
      rating: 4.3,
      image: '/images/cities/bagan.jpg'
    }
  ];

  const categories = [
    { id: 'all', label: '全部', labelEn: 'All', icon: Star, color: 'bg-gray-500' },
    { id: 'cultural', label: '文化', labelEn: 'Cultural', icon: Camera, color: 'bg-purple-500' },
    { id: 'natural', label: '自然', labelEn: 'Natural', icon: TreePine, color: 'bg-green-500' },
    { id: 'adventure', label: '冒险', labelEn: 'Adventure', icon: Mountain, color: 'bg-orange-500' },
    { id: 'spiritual', label: '心灵', labelEn: 'Spiritual', icon: Waves, color: 'bg-blue-500' }
  ];

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(loc => loc.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const categoryMap = {
      cultural: 'bg-purple-500',
      natural: 'bg-green-500',
      adventure: 'bg-orange-500',
      spiritual: 'bg-blue-500'
    };
    return categoryMap[category as keyof typeof categoryMap] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('map.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {t('map.subtitle')}
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
            <p className="text-lg text-blue-800">
              🗺️ <strong>缅缅AI智能导航：</strong>根据您的位置和兴趣，智能推荐最佳游览路线和必访景点！
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon size={18} />
                <span>{i18n.language === 'zh' ? category.label : category.labelEn}</span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Map Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                <h3 className="text-white font-semibold text-lg">缅甸文化地图 Myanmar Cultural Map</h3>
              </div>
              
              {/* Interactive Map Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 p-8">
                {/* Myanmar Map Outline */}
                <div className="absolute inset-4 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg opacity-50"></div>
                
                {/* Location Markers */}
                {filteredLocations.map((location, index) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getCategoryColor(location.category)} text-white rounded-full p-2 hover:scale-110 transition-all duration-200 shadow-lg`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                  >
                    <MapPin size={20} />
                  </button>
                ))}
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">图例 Legend</h4>
                  <div className="space-y-1">
                    {categories.slice(1).map((category) => {
                      const Icon = category.icon;
                      return (
                        <div key={category.id} className="flex items-center space-x-2 text-xs">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span>{i18n.language === 'zh' ? category.label : category.labelEn}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {selectedLocation ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <img
                  src={selectedLocation.image}
                  alt={i18n.language === 'zh' ? selectedLocation.name : selectedLocation.nameEn}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {i18n.language === 'zh' ? selectedLocation.name : selectedLocation.nameEn}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">
                        {selectedLocation.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {i18n.language === 'zh' ? selectedLocation.description : selectedLocation.descriptionEn}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(selectedLocation.category)}`}>
                      {selectedLocation.category === 'cultural' && (i18n.language === 'zh' ? '文化' : 'Cultural')}
                      {selectedLocation.category === 'natural' && (i18n.language === 'zh' ? '自然' : 'Natural')}
                      {selectedLocation.category === 'adventure' && (i18n.language === 'zh' ? '冒险' : 'Adventure')}
                      {selectedLocation.category === 'spiritual' && (i18n.language === 'zh' ? '心灵' : 'Spiritual')}
                    </span>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium">
                    {t('common.learnMore')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {i18n.language === 'zh' ? '选择一个地点' : 'Select a Location'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'zh' 
                    ? '点击地图上的标记来查看详细信息' 
                    : 'Click on a marker on the map to view details'}
                </p>
              </div>
            )}

            {/* Location List */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {i18n.language === 'zh' ? '热门地点' : 'Popular Locations'}
              </h3>
              <div className="space-y-3">
                {filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                      selectedLocation?.id === location.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(location.category)}`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {i18n.language === 'zh' ? location.name : location.nameEn}
                        </h4>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{location.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;