import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, MapPin, Clock, Navigation, ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  getCityCoordinates, 
  calculateDistance, 
  calculateFlightTime, 
  formatDistance, 
  formatFlightTime,
  calculateMidpoint,
  generateFlightPath,
  calculateBearing
} from '../utils/geoUtils';
import './Journey.css';

interface JourneyData {
  city: string;
  description: string;
  activities: string[];
  image: string;
}

const Journey: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flightProgress, setFlightProgress] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const flightPathRef = useRef<L.Polyline | null>(null);
  const planeMarkerRef = useRef<L.Marker | null>(null);
  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const journeyData = location.state as JourneyData;

  // 城市名称标准化映射
  const normalizeCity = (cityName: string): string => {
    const cityMapping: Record<string, string> = {
      '额吉利海滩': '额布里海滩'
    };
    return cityMapping[cityName] || cityName;
  };

  // 计算真实地理数据
  const beijingCoords = getCityCoordinates('北京');
  const normalizedCity = normalizeCity(journeyData?.city || '仰光');
  const destinationCoords = getCityCoordinates(normalizedCity);
  
  const distance = beijingCoords && destinationCoords 
    ? calculateDistance(beijingCoords.lat, beijingCoords.lng, destinationCoords.lat, destinationCoords.lng)
    : 0;
  
  const flightTime = calculateFlightTime(distance);
  const flightPath = useMemo(() => {
    if (beijingCoords && destinationCoords) {
      return generateFlightPath(
        beijingCoords.lat,
        beijingCoords.lng,
        destinationCoords.lat,
        destinationCoords.lng,
        50
      );
    }
    return [];
  }, [beijingCoords, destinationCoords]);

  // 如果没有数据，重定向到推荐页面
  useEffect(() => {
    if (!journeyData) {
      navigate('/recommendations');
    }
  }, [journeyData, navigate]);

  // 地图初始化useEffect
  useEffect(() => {
    console.log('🗺️ 地图初始化开始');
    
    // 清理之前的地图实例
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      } catch (error) {
        console.warn('清理地图实例时出错:', error);
      }
    }

    // 清理飞机标记
    if (planeMarkerRef.current) {
      try {
        planeMarkerRef.current.remove();
        planeMarkerRef.current = null;
      } catch (error) {
        console.warn('清理飞机标记时出错:', error);
      }
    }

    if (mapRef.current && beijingCoords && destinationCoords && flightPath.length > 0) {
      try {
        // 确保容器存在且有尺寸
        const container = mapRef.current;
        if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
          console.warn('地图容器不存在或尺寸为0');
          return;
        }

        console.log('📍 坐标信息:');
        console.log('- 北京:', beijingCoords);
        console.log('- 目标城市:', normalizedCity, destinationCoords);
        console.log('- 飞行路径点数:', flightPath.length);

        // 计算地图中心点
        const midpoint = calculateMidpoint(
          beijingCoords.lat, beijingCoords.lng,
          destinationCoords.lat, destinationCoords.lng
        );

        // 创建地图实例
        const map = L.map(container, {
          zoomControl: true,
          attributionControl: true,
          preferCanvas: false, // 禁用canvas渲染器，使用SVG渲染器避免canvas错误
          renderer: L.svg({ padding: 0.5 }) // 使用SVG渲染器替代canvas
        }).setView([midpoint.lat, midpoint.lng], 4);

        // 添加地图瓦片 - 使用多个备用瓦片源
        const tileProviders = [
          {
            name: 'CartoDB Positron',
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            options: {
              attribution: '© OpenStreetMap contributors © CARTO',
              subdomains: 'abcd',
              maxZoom: 19
            }
          },
          {
            name: 'OpenStreetMap',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            options: {
              attribution: '© OpenStreetMap contributors',
              maxZoom: 19
            }
          },
          {
            name: 'CartoDB Voyager',
            url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            options: {
              attribution: '© OpenStreetMap contributors © CARTO',
              subdomains: 'abcd',
              maxZoom: 19
            }
          }
        ];
        
        let currentProviderIndex = 0;
        let tileLayer: L.TileLayer | null = null;

        const createTileLayer = (providerIndex: number) => {
          const provider = tileProviders[providerIndex];
          return L.tileLayer(provider.url, {
            ...provider.options,
            minZoom: 2,
            errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM5OTkiPk1hcCBUaWxlPC90ZXh0Pjwvc3ZnPg==',
            retryDelay: 2000,
            retryLimit: 2
          });
        };

        const tryNextProvider = () => {
          if (tileLayer) {
            map.removeLayer(tileLayer);
          }
          
          currentProviderIndex = (currentProviderIndex + 1) % tileProviders.length;
          tileLayer = createTileLayer(currentProviderIndex);
          
          console.log(`🗺️ 尝试瓦片提供商: ${tileProviders[currentProviderIndex].name}`);
          
          tileLayer.on('tileerror', (e) => {
            console.warn(`❌ 瓦片加载失败 (${tileProviders[currentProviderIndex].name}):`, e);
            
            // 如果当前提供商失败次数过多，尝试下一个
            setTimeout(() => {
              if (currentProviderIndex < tileProviders.length - 1) {
                tryNextProvider();
              } else {
                console.error('❌ 所有瓦片提供商都失败了，使用离线模式');
              }
            }, 1000);
          });

          tileLayer.on('tileload', () => {
            console.log(`✅ 瓦片加载成功 (${tileProviders[currentProviderIndex].name})`);
          });
          
          tileLayer.addTo(map);
        };

        // 初始化第一个瓦片提供商
        tryNextProvider();

        // 创建自定义图标
        const createIcon = (color: string) => L.divIcon({
          html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
          className: 'custom-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        // 添加起点标记（北京）
        const startMarker = L.marker([beijingCoords.lat, beijingCoords.lng], { 
          icon: createIcon('#3b82f6') 
        }).addTo(map).bindPopup('北京 (起点)');

        // 添加终点标记
        const endMarker = L.marker([destinationCoords.lat, destinationCoords.lng], { 
          icon: createIcon('#f59e0b') 
        }).addTo(map).bindPopup(`${destinationCoords.name} (目的地)`);

        // 创建飞行路径
        const pathCoords = flightPath.map(point => [point.lat, point.lng] as [number, number]);
        const flightLine = L.polyline(pathCoords, {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.7,
          dashArray: '10, 10'
        }).addTo(map);

        flightPathRef.current = flightLine;
        mapInstanceRef.current = map;

        // 调整地图视图以包含所有标记
        const group = new L.FeatureGroup([startMarker, endMarker]);
        map.fitBounds(group.getBounds().pad(0.1));

        console.log('✅ 地图初始化完成');

      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    }

    return () => {
      // 清理资源
      if (stepIntervalRef.current) {
        clearInterval(stepIntervalRef.current);
        stepIntervalRef.current = null;
      }
      
      if (planeMarkerRef.current) {
        try {
          if (mapInstanceRef.current && planeMarkerRef.current.getElement()) {
            mapInstanceRef.current.removeLayer(planeMarkerRef.current);
          }
          planeMarkerRef.current = null;
        } catch (error) {
          console.warn('清理飞机标记时出错:', error);
        }
      }
      
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch (error) {
          console.warn('清理地图实例时出错:', error);
        }
      }
    };
  }, [beijingCoords, destinationCoords, flightPath]);

  // 动画控制useEffect - 步进式动画
  useEffect(() => {
    console.log('🎬 动画控制useEffect触发');
    console.log('- isFlying:', isFlying);
    console.log('- mapInstanceRef存在:', !!mapInstanceRef.current);
    console.log('- flightPath长度:', flightPath.length);
    
    if (isFlying && mapInstanceRef.current && flightPath.length > 0 && beijingCoords && destinationCoords) {
      console.log('🚀 开始步进式飞机动画');
      
      // 创建飞机标记（只创建一次）
      if (!planeMarkerRef.current) {
        console.log('✈️ 创建飞机标记');
        
        // 创建简单明显的飞机图标
        const planeIcon = L.divIcon({
          html: `<div class="plane-icon-wrapper" style="
            width: 30px;
            height: 30px;
            background: #ff0000;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(255,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            animation: planePulse 2s infinite;
          "><span class="plane-emoji">✈️</span></div>`,
          className: 'plane-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        try {
          planeMarkerRef.current = L.marker([flightPath[0].lat, flightPath[0].lng], {
            icon: planeIcon,
            zIndexOffset: 1000
          }).addTo(mapInstanceRef.current);
          
          // 设置初始朝向（指向下一路径点）
          try {
            const nextInit = flightPath[Math.min(1, flightPath.length - 1)];
            const initBearing = calculateBearing(
              flightPath[0].lat, flightPath[0].lng,
              nextInit.lat, nextInit.lng
            );
            const el = planeMarkerRef.current.getElement();
            const emoji = el ? (el.querySelector('.plane-emoji') as HTMLElement | null) : null;
            if (emoji) {
              emoji.style.transform = `rotate(${initBearing}deg)`;
            }
          } catch (e) {
            console.warn('设置初始朝向失败', e);
          }

          console.log('✅ 飞机标记创建成功，起始位置:', flightPath[0]);
        } catch (error) {
          console.error('❌ 创建飞机标记失败:', error);
          return;
        }
      }

      // 清理之前的定时器
      if (stepIntervalRef.current) {
        clearInterval(stepIntervalRef.current);
        stepIntervalRef.current = null;
      }

      // 步进式动画逻辑（从当前步骤继续，避免重置到0）
      let step = currentStep;
      stepIntervalRef.current = setInterval(() => {
        try {
          if (step >= flightPath.length - 1) {
            console.log('🎯 飞行完成！');
            setHasArrived(true);
            setIsFlying(false);
            setFlightProgress(100);
            if (stepIntervalRef.current) {
              clearInterval(stepIntervalRef.current);
              stepIntervalRef.current = null;
            }
            return;
          }

          const currentPosition = flightPath[step];
          const progress = Math.round((step / (flightPath.length - 1)) * 100);
          
          console.log(`🛩️ 步骤 ${step}/${flightPath.length - 1}, 进度: ${progress}%, 位置:`, currentPosition);
          
          if (currentPosition && planeMarkerRef.current && mapInstanceRef.current) {
            // 检查地图和标记是否仍然有效
            if (!mapInstanceRef.current.getContainer()) {
              console.warn('地图容器已被移除，停止动画');
              setIsFlying(false);
              if (stepIntervalRef.current) {
                clearInterval(stepIntervalRef.current);
                stepIntervalRef.current = null;
              }
              return;
            }

            // 更新飞机位置
            planeMarkerRef.current.setLatLng([currentPosition.lat, currentPosition.lng]);
            
            // 根据下一点计算朝向并旋转标记中的飞机图标
            try {
              const nextPoint = flightPath[Math.min(step + 1, flightPath.length - 1)];
              const bearing = calculateBearing(
                currentPosition.lat, currentPosition.lng,
                nextPoint.lat, nextPoint.lng
              );
              const el = planeMarkerRef.current.getElement();
              const emoji = el ? (el.querySelector('.plane-emoji') as HTMLElement | null) : null;
              if (emoji) {
                emoji.style.transform = `rotate(${bearing}deg)`;
              }
            } catch (e) {
              console.warn('更新飞机朝向失败', e);
            }
            
            // 更新进度状态
            setCurrentStep(step);
            setFlightProgress(progress);
            
            // 每5步让地图跟随飞机移动，添加错误处理
            if (step % 5 === 0) {
              try {
                mapInstanceRef.current.panTo([currentPosition.lat, currentPosition.lng], {
                  animate: true,
                  duration: 0.25
                });
              } catch (panError) {
                console.warn('地图平移时出错:', panError);
              }
            }
            
            console.log(`✅ 飞机位置已更新到步骤 ${step}`);
          } else {
            console.warn('缺少必要的引用，停止动画');
            setIsFlying(false);
            if (stepIntervalRef.current) {
              clearInterval(stepIntervalRef.current);
              stepIntervalRef.current = null;
            }
            return;
          }

          step++;
        } catch (error) {
          console.error('❌ 动画步骤执行时出错:', error);
          setIsFlying(false);
          if (stepIntervalRef.current) {
            clearInterval(stepIntervalRef.current);
            stepIntervalRef.current = null;
          }
        }
      }, 200); // 减少到200ms，让动画更流畅

      return () => {
        if (stepIntervalRef.current) {
          clearInterval(stepIntervalRef.current);
          stepIntervalRef.current = null;
        }
      };
    } else {
      console.log('❌ 动画条件不满足');
      if (!isFlying) console.log('- isFlying 为 false');
      if (!mapInstanceRef.current) console.log('- 地图实例不存在');
      if (flightPath.length === 0) console.log('- 飞行路径为空');
      if (!beijingCoords) console.log('- 北京坐标不存在');
      if (!destinationCoords) console.log('- 目标城市坐标不存在');
    }
  }, [isFlying, beijingCoords, destinationCoords, flightPath]);

  const startJourney = () => {
    console.log('🚀 开始旅程按钮被点击');
    console.log('目标城市:', journeyData.city, '→', normalizedCity);
    console.log('地图实例存在:', !!mapInstanceRef.current);
    console.log('飞行路径长度:', flightPath.length);
    
    // 确保所有必要条件都满足
    if (!mapInstanceRef.current) {
      console.error('❌ 地图实例不存在，无法开始飞行');
      return;
    }
    
    if (flightPath.length === 0) {
      console.error('❌ 飞行路径为空，无法开始飞行');
      return;
    }
    
    setIsFlying(true);
    setFlightProgress(0);
    setCurrentStep(0);
    setHasArrived(false);
    
    console.log('✅ 飞行状态已设置为true');
  };

  const resetJourney = () => {
    console.log('🔄 重置旅程');
    setFlightProgress(0);
    setCurrentStep(0);
    setIsFlying(false);
    setHasArrived(false);
    
    // 清理定时器
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    
    // 重置飞机位置到起点
    if (planeMarkerRef.current && flightPath.length > 0) {
      console.log('重置飞机位置到起始点:', flightPath[0]);
      planeMarkerRef.current.setLatLng([flightPath[0].lat, flightPath[0].lng]);
    }
  };

  if (!journeyData) {
    return null;
  }

  return (
    <div className="journey-container">
      {/* 头部导航 */}
      <div className="journey-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          返回
        </button>
        <h1 className="journey-title">
          ✈️ AI启程 - 从北京出发
        </h1>
      </div>

      {/* 飞行信息卡片 */}
      <div className="flight-info-card">
        <div className="flight-route">
          <div className="city-info">
            <MapPin className="city-icon" />
            <div>
              <h3>北京</h3>
              <p>首都国际机场</p>
            </div>
          </div>
          
          <div className="flight-path">
            <div className="flight-line">
              <div 
                className="flight-progress" 
                style={{ width: `${flightProgress}%` }}
              ></div>
              <div 
                className={`airplane ${isFlying ? 'flying' : ''}`}
                style={{ left: `${flightProgress}%` }}
              >
                <div className="airplane-icon">
                  <Plane size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="city-info destination">
            <MapPin className="city-icon destination-icon" />
            <div>
              <h3>{journeyData.city}</h3>
              <p>旅游目的地</p>
            </div>
          </div>
        </div>

        <div className="flight-details">
          <div className="detail-item">
            <Clock size={16} />
            <span>预估飞行时间: {formatFlightTime(flightTime)}</span>
          </div>
          <div className="detail-item">
            <Navigation size={16} />
            <span>大致距离: {formatDistance(distance)}</span>
          </div>
          <div className="detail-item">
            <span className="progress-text">
              飞行进度: {Math.round(flightProgress)}%
            </span>
          </div>
          <div className="detail-item">
            <span className="step-text">
              步骤: {currentStep}/{flightPath.length - 1}
            </span>
          </div>
        </div>
      </div>

      {/* 实时位置显示面板 */}
      {isFlying && currentStep < flightPath.length && (
        <div className="real-time-position">
          <h4>🛩️ 实时飞行位置</h4>
          <p>纬度: {flightPath[currentStep]?.lat.toFixed(4)}</p>
          <p>经度: {flightPath[currentStep]?.lng.toFixed(4)}</p>
          <p>当前步骤: {currentStep + 1}/{flightPath.length}</p>
        </div>
      )}

      {/* 真实地图区域 */}
      <div className="map-container">
        <div ref={mapRef} className="leaflet-map"></div>
      </div>

      {/* 目的地信息 */}
      <div className="destination-info">
        <div className="destination-card">
          <img 
            src={journeyData.image} 
            alt={journeyData.city}
            className="destination-image"
          />
          <div className="destination-content">
            <h2>目的地: {journeyData.city}</h2>
            <p className="destination-description">
              {journeyData.description}
            </p>
            
            <div className="activities-section">
              <h3>推荐活动:</h3>
              <ul className="activities-list">
                {journeyData.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="journey-controls">
        {!isFlying && !hasArrived && (
          <button onClick={startJourney} className="start-journey-btn">
            <Plane size={20} />
            开始飞行
          </button>
        )}
        
        {isFlying && (
          <div className="flying-status">
            <div className="flying-animation">✈️</div>
            <p>正在飞往 {journeyData.city}...</p>
            <p>步骤: {currentStep + 1}/{flightPath.length}</p>
          </div>
        )}

        {hasArrived && (
          <div className="arrival-status">
            <div className="arrival-animation">🎉</div>
            <p>已抵达 {journeyData.city}！</p>
            <button onClick={resetJourney} className="reset-journey-btn">
              重新飞行
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journey;