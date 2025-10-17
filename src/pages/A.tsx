import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Robot3D from '../components/Robot3D';

const A: React.FC = () => {
  const { t } = useTranslation();
  const cardBase = 'w-64 h-40 shrink-0 rounded-2xl shadow-lg border border-white/20 overflow-hidden bg-white/90 backdrop-blur';
  const sectionTitle = 'text-lg font-bold text-gray-900';
  const sectionDesc = 'text-gray-500 text-xs';
  const carouselBase = 'flex gap-4 overflow-x-auto px-2 py-2';

  const postcards = [
    { title: t('aPage.postcardTitles.beijing'), subtitle: t('aPage.postcardSubtitles.beijing'), emoji: '📮' },
    { title: t('aPage.postcardTitles.yangon'), subtitle: t('aPage.postcardSubtitles.yangon'), emoji: '✉️' },
    { title: t('aPage.postcardTitles.bagan'), subtitle: t('aPage.postcardSubtitles.bagan'), emoji: '🌅' },
    { title: t('aPage.postcardTitles.inleLake'), subtitle: t('aPage.postcardSubtitles.inleLake'), emoji: '🌊' },
  ];

  const videos = [
    { title: t('aPage.videoTitles.culture'), duration: '4:32', image: 'https://placehold.co/600x400?text=Myanmar+Culture' },
    { title: t('aPage.videoTitles.bagan'), duration: '6:05', image: 'https://placehold.co/600x400?text=Bagan+Drone' },
    { title: t('aPage.videoTitles.yangon'), duration: '5:12', image: 'https://placehold.co/600x400?text=Yangon+City' },
    { title: t('aPage.videoTitles.inleLake'), duration: '3:48', image: 'https://placehold.co/600x400?text=Inle+Lake+Life' },
  ];

  // 缅甸 5 城市明信片（正面/背面）存放路径
  const postcardSets = [
    { 
      city: '仰光', 
      cityEn: 'Yangon', 
      slug: 'yangon', 
      front: '/images/postcards/yangon-front.png', 
      back: '/images/postcards/yangon-back.png',
      coordinates: { lat: 16.8661, lng: 96.1951 }, // 真实地理坐标
      description: t('aPage.cityDescriptions.yangon')
    },
    { 
      city: '蒲甘', 
      cityEn: 'Bagan', 
      slug: 'bagan', 
      front: '/images/postcards/bagan-front.png', 
      back: '/images/postcards/bagan-back.png',
      coordinates: { lat: 21.1717, lng: 94.8574 },
      description: t('aPage.cityDescriptions.bagan')
    },
    { 
      city: '曼德勒', 
      cityEn: 'Mandalay', 
      slug: 'mandalay', 
      front: '/images/postcards/mandalay-front.png', 
      back: '/images/postcards/mandalay-back.png',
      coordinates: { lat: 21.9588, lng: 96.0891 },
      description: t('aPage.cityDescriptions.mandalay')
    },
    { 
      city: '茵莱湖', 
      cityEn: 'Inle Lake', 
      slug: 'inle-lake', 
      front: '/images/postcards/inle-lake-front.png', 
      back: '/images/postcards/inle-lake-back.png',
      coordinates: { lat: 20.5792, lng: 96.9014 },
      description: t('aPage.cityDescriptions.inleLake')
    },
    { 
      city: '额吉利海滩', 
      cityEn: 'Ngapali Beach', 
      slug: 'ngapali', 
      front: '/images/postcards/ngapali-front.png', 
      back: '/images/postcards/ngapali-back.png',
      coordinates: { lat: 18.8050, lng: 94.3372 },
      description: t('aPage.cityDescriptions.ngapali')
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCityForVideo, setSelectedCityForVideo] = useState<string>('yangon');
  const videoRef = useRef<HTMLVideoElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const handleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      const anyEl = el as any;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (anyEl.webkitEnterFullscreen) {
        anyEl.webkitEnterFullscreen();
      } else if (anyEl.webkitRequestFullscreen) {
        anyEl.webkitRequestFullscreen();
      } else if (anyEl.msRequestFullscreen) {
        anyEl.msRequestFullscreen();
      } else if (anyEl.mozRequestFullScreen) {
        anyEl.mozRequestFullScreen();
      }
      el.play?.();
    } catch (e) {
      // ignore
    }
  };

  // 读取推荐城市：优先 URL 参数 ?city=，其次 localStorage.recommendedCitySlug
  const getSelectedCitySlug = (): string => {
    try {
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const qp = new URLSearchParams(search);
      const urlCity = qp.get('city');
      if (urlCity) return urlCity;
      const storedCity = typeof window !== 'undefined' ? localStorage.getItem('recommendedCitySlug') : null;
      return storedCity || 'yangon';
    } catch {
      return 'yangon';
    }
  };

  const selectedCitySlug = getSelectedCitySlug();
  const activePostcard = postcardSets.find(p => p.slug === selectedCitySlug) || postcardSets[0];
  const activeVideoCity = postcardSets.find(p => p.slug === selectedCityForVideo) || postcardSets[0];

  // 处理城市点击
  const handleCityClick = (citySlug: string) => {
    setSelectedCityForVideo(citySlug);
    
    // 更新地图标记样式
    Object.keys(markersRef.current).forEach(slug => {
      const marker = markersRef.current[slug];
      if (marker) {
        const city = postcardSets.find(c => c.slug === slug);
        if (city) {
          const isSelected = slug === citySlug;
          const iconHtml = `
            <div style="
              width: 30px; 
              height: 30px; 
              background: ${isSelected ? '#dc2626' : '#f59e0b'}; 
              border: 3px solid white; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 12px; 
              font-weight: bold; 
              color: white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              ${isSelected ? 'animation: pulse 2s infinite;' : ''}
            ">
              📍
            </div>
          `;
          
          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
          
          marker.setIcon(customIcon);
        }
      }
    });
  };

  // 初始化地图
  useEffect(() => {
    if (!mapRef.current) return;

    // 清理之前的地图实例
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // 创建地图实例，聚焦缅甸
    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([20.0, 96.0], 6); // 缅甸中心位置

    // 添加OpenStreetMap瓦片层
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: ['a', 'b', 'c', 'd'],
      maxZoom: 18,
      minZoom: 5,
    }).addTo(map);

    // 添加城市标记
    postcardSets.forEach((city) => {
      const isSelected = city.slug === selectedCityForVideo;
      
      const iconHtml = `
        <div style="
          width: 30px; 
          height: 30px; 
          background: ${isSelected ? '#dc2626' : '#f59e0b'}; 
          border: 3px solid white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 12px; 
          font-weight: bold; 
          color: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          ${isSelected ? 'animation: pulse 2s infinite;' : ''}
        ">
          📍
        </div>
      `;
      
      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([city.coordinates.lat, city.coordinates.lng], {
        icon: customIcon
      }).addTo(map);

      // 添加弹出窗口
      marker.bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${city.city}</h3>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${city.cityEn}</p>
          <p style="margin: 0; color: #374151; font-size: 12px;">${city.description}</p>
        </div>
      `);

      // 点击弹出窗口时也触发城市选择
      marker.on('popupopen', () => {
        handleCityClick(city.slug);
      });

      // 点击事件
      marker.on('click', () => {
        handleCityClick(city.slug);
      });

      // 保存标记引用
      markersRef.current[city.slug] = marker;
    });

    // 添加城市间连线
    const coordinates = postcardSets.map(city => [city.coordinates.lat, city.coordinates.lng] as [number, number]);
    
    // 创建连接所有城市的路径
    const polyline = L.polyline(coordinates, {
      color: '#f59e0b',
      weight: 2,
      opacity: 0.6,
      dashArray: '5, 10'
    }).addTo(map);

    mapInstanceRef.current = map;

    // 清理函数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = {};
    };
  }, []);

  // 当选中城市改变时更新标记样式
  useEffect(() => {
    handleCityClick(selectedCityForVideo);
  }, [selectedCityForVideo]);

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
          
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 12px !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
          }
          
          .leaflet-popup-tip {
            background: white !important;
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* 顶部标题 */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
          <div className="max-w-7xl mx-auto px-6 py-6">
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
          {/* 城市明信片正反面展示（仅推荐城市） */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className={sectionTitle}>{t('aPage.postcardTitle')}</h2>
                <p className={sectionDesc}>{t('aPage.postcardDescription')}</p>
              </div>
            </div>
            {/* 正反面图片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 正面 */}
              <div className="rounded-2xl shadow-lg border border-white/20 overflow-hidden bg-white/90">
                <div className="px-3 py-2 border-b text-gray-700 text-xs">{t('aPage.frontSide')}</div>
                <div className="w-full h-64 flex items-center justify-center bg-white">
                  <img
                    src={activePostcard.front}
                    alt={`${activePostcard.city} 明信片正面`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.src = 'https://placehold.co/800x480?text=Postcard+Front';
                    }}
                  />
                </div>
              </div>
              {/* 背面 */}
              <div className="rounded-2xl shadow-lg border border-white/20 overflow-hidden bg-white/90">
                <div className="px-3 py-2 border-b text-gray-700 text-xs">{t('aPage.backSide')}</div>
                <div className="w-full h-64 flex items-center justify-center bg-white">
                  <img
                    src={activePostcard.back}
                    alt={`${activePostcard.city} 明信片背面`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.src = 'https://placehold.co/800x480?text=Postcard+Back';
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 交互式缅甸地图与视频展示区 */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className={sectionTitle}>{t('aPage.mapVideoTitle')}</h2>
                <p className={sectionDesc}>{t('aPage.mapVideoDescription')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 左侧：交互式地图 */}
              <div className="rounded-2xl shadow-lg border border-white/20 overflow-hidden bg-white/90 backdrop-blur">
                <div className="px-4 py-3 border-b text-gray-700 text-sm font-medium">{t('aPage.mapTitle')}</div>
                <div className="relative w-full h-96">
                  <div 
                    ref={mapRef} 
                    className="w-full h-full rounded-b-2xl"
                    style={{ zIndex: 1 }}
                  />
                  
                  {/* 地图图例 */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 text-xs z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span>{t('aPage.cityLocation')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      <span>{t('aPage.currentSelected')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧：视频播放器 */}
              <div className="rounded-2xl shadow-lg border border-white/20 overflow-hidden bg-white/90 backdrop-blur">
                <div className="px-4 py-3 border-b text-gray-700 text-sm font-medium">
                  {activeVideoCity.city} - {activeVideoCity.cityEn}
                </div>
                <div className="relative w-full h-96">
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-black/50 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    aria-label="全屏播放"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <polyline points="21 15 21 21 15 21" />
                      <polyline points="3 9 3 3 9 3" />
                    </svg>
                  </button>
                  <video
                    key={selectedCityForVideo} // 强制重新加载视频
                    src={`/images/videos/${activeVideoCity.slug}.mp4`}
                    className="absolute inset-0 w-full h-full object-cover"
                    ref={videoRef}
                    autoPlay
                    loop
                    playsInline
                    onError={(e) => {
                      const video = e.currentTarget as HTMLVideoElement;
                      video.style.display = 'none';
                      const fallbackImg = video.nextElementSibling as HTMLImageElement;
                      if (fallbackImg) {
                        fallbackImg.style.display = 'block';
                      }
                    }}
                  />
                  <img
                    src={`https://placehold.co/600x400/f59e0b/ffffff?text=${encodeURIComponent(activeVideoCity.cityEn + ' Video')}`}
                    alt={`${activeVideoCity.city}视频占位图`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ display: 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-lg drop-shadow">{activeVideoCity.city}</h3>
                        <p className="text-white/80 text-sm">{activeVideoCity.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-white/80 text-sm">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 城市信息卡片 */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
              {postcardSets.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => handleCityClick(city.slug)}
                  className={`p-3 rounded-xl border transition-all duration-200 text-left ${
                    selectedCityForVideo === city.slug
                      ? 'bg-red-50 border-red-200 shadow-md'
                      : 'bg-white/70 border-white/40 hover:bg-white/90 hover:shadow-sm'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">{city.city}</div>
                  <div className="text-xs text-gray-500 mt-1">{city.cityEn}</div>
                  <div className="text-xs text-gray-600 mt-1">{city.description}</div>
                </button>
              ))}
            </div>
          </section>
        </div>
        <Robot3D />
      </div>
    </>
  );
};

export default A;