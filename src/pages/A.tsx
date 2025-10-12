import React from 'react';

const A: React.FC = () => {
  const cardBase = 'w-64 h-40 shrink-0 rounded-2xl shadow-lg border border-white/20 overflow-hidden bg-white/90 backdrop-blur';
  const sectionTitle = 'text-lg font-bold text-gray-900';
  const sectionDesc = 'text-gray-500 text-xs';
  const carouselBase = 'flex gap-4 overflow-x-auto px-2 py-2';

  const postcards = [
    { title: '来自北京的问候', subtitle: '首都风情', emoji: '📮' },
    { title: '仰光的一封信', subtitle: '大金塔之光', emoji: '✉️' },
    { title: '蒲甘的晨曦', subtitle: '万塔之城', emoji: '🌅' },
    { title: '茵莱湖的水上生活', subtitle: '水上村庄', emoji: '🌊' },
  ];

  const attractions = [
    { title: '蒲甘古城', city: '蒲甘', image: 'https://placehold.co/600x400?text=Bagan' },
    { title: '仰光大金塔', city: '仰光', image: 'https://placehold.co/600x400?text=Shwedagon' },
    { title: '乌本桥日落', city: '曼德勒', image: 'https://placehold.co/600x400?text=U+Bein+Bridge' },
    { title: '茵莱湖渔民', city: '掸邦', image: 'https://placehold.co/600x400?text=Inle+Lake' },
  ];

  const videos = [
    { title: '缅甸文化速览', duration: '4:32', image: 'https://placehold.co/600x400?text=Myanmar+Culture' },
    { title: '蒲甘航拍之旅', duration: '6:05', image: 'https://placehold.co/600x400?text=Bagan+Drone' },
    { title: '仰光城市漫游', duration: '5:12', image: 'https://placehold.co/600x400?text=Yangon+City' },
    { title: '茵莱湖水上生活', duration: '3:48', image: 'https://placehold.co/600x400?text=Inle+Lake+Life' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* 顶部标题 */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            虚拟旅行
          </h1>
          <p className="mt-1 text-white/80 text-xs md:text-sm">
            浏览明信片、景点照片与旅游视频，开启一段沉浸式的云端之旅。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* 明信片展示区 */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className={sectionTitle}>明信片展示区</h2>
              <p className={sectionDesc}>以卡片形式呈现各地风情，左右滑动浏览</p>
            </div>
          </div>
          <div className={carouselBase} style={{ scrollSnapType: 'x mandatory' }}>
            {postcards.map((card, idx) => (
              <div
                key={`postcard-${idx}`}
                className={`${cardBase} bg-gradient-to-br from-white via-orange-50 to-amber-100`}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="h-full w-full p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{card.emoji}</span>
                    <span className="text-xs text-gray-400">POSTCARD</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{card.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 城市旅游景点照片展示区 */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className={sectionTitle}>城市旅游景点照片展示区</h2>
              <p className={sectionDesc}>城市地标与自然风光轮播，支持手动滑动</p>
            </div>
          </div>
          <div className={carouselBase} style={{ scrollSnapType: 'x mandatory' }}>
            {attractions.map((item, idx) => (
              <div
                key={`attraction-${idx}`}
                className={cardBase}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative h-full w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-base drop-shadow">{item.title}</h3>
                    <p className="text-white/80 text-xs">{item.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 相关旅游视频展示区 */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className={sectionTitle}>相关旅游视频展示区</h2>
              <p className={sectionDesc}>精选旅行短视频，点开探索更多</p>
            </div>
          </div>
          <div className={carouselBase} style={{ scrollSnapType: 'x mandatory' }}>
            {videos.map((v, idx) => (
              <div
                key={`video-${idx}`}
                className={cardBase}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative h-full w-full">
                  <img
                    src={v.image}
                    alt={v.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow">
                      <span className="text-red-600 text-xl">▶</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-base drop-shadow">{v.title}</h3>
                      <p className="text-white/80 text-xs">时长 {v.duration}</p>
                    </div>
                    <span className="text-white/80 text-xs">TRAVEL VIDEO</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default A;