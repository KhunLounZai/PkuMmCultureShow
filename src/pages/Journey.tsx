import React, { useState, useEffect, useRef } from 'react';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const flightPathRef = useRef<L.Polyline | null>(null);
  const planeMarkerRef = useRef<L.Marker | null>(null);
  
  const journeyData = location.state as JourneyData;

  // 计算真实地理数据
  const beijingCoords = getCityCoordinates('北京');
  const destinationCoords = getCityCoordinates(journeyData?.city || '仰光');
  
  const distance = beijingCoords && destinationCoords 
    ? calculateDistance(beijingCoords.lat, beijingCoords.lng, destinationCoords.lat, destinationCoords.lng)
    : 0;
  
  const flightTime = calculateFlightTime(distance);
  const flightPath = beijingCoords && destinationCoords 
    ? generateFlightPath(beijingCoords.lat, beijingCoords.lng, destinationCoords.lat, destinationCoords.lng)
    : [];

  // 如果没有数据，重定向到推荐页面
  useEffect(() => {
    if (!journeyData) {
      navigate('/recommendations');
    }
  }, [journeyData, navigate]);

  // 地图初始化
  useEffect(() => {
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

        // 计算地图中心点
        const midpoint = calculateMidpoint(
          beijingCoords.lat, beijingCoords.lng,
          destinationCoords.lat, destinationCoords.lng
        );

        // 创建地图实例
        const map = L.map(container, {
          zoomControl: true,
          attributionControl: true,
          preferCanvas: true // 使用Canvas渲染提高性能
        }).setView([midpoint.lat, midpoint.lng], 4);

        // 添加地图瓦片，增强错误处理和重试机制
        const tileUrls = [
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
        ];
        
        let currentTileIndex = 0;
        let tileLayer: L.TileLayer;
        
        const createTileLayer = (urlIndex: number) => {
          return L.tileLayer(tileUrls[urlIndex], {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            minZoom: 2,
            errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y5ZjlmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjY2NjIj7liqDovb3lpLHotKU8L3RleHQ+PC9zdmc+',
            timeout: 8000,
            retryDelay: 1000,
            maxRetries: 2
          });
        };

        tileLayer = createTileLayer(currentTileIndex);

        // 监听瓦片加载错误并实现重试机制
        let errorCount = 0;
        tileLayer.on('tileerror', (e: any) => {
          console.warn(`瓦片加载失败 (${errorCount + 1}):`, e.tile.src);
          errorCount++;
          
          // 如果错误过多，尝试切换到备用瓦片服务
          if (errorCount > 5 && currentTileIndex < tileUrls.length - 1) {
            console.log('切换到备用瓦片服务...');
            map.removeLayer(tileLayer);
            currentTileIndex++;
            tileLayer = createTileLayer(currentTileIndex);
            tileLayer.addTo(map);
            errorCount = 0;
          }
        });

        tileLayer.on('tileload', () => {
          // 瓦片加载成功时重置错误计数
          if (errorCount > 0) {
            errorCount = Math.max(0, errorCount - 1);
          }
        });

        tileLayer.addTo(map);

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

        // 延迟刷新地图尺寸，确保容器完全渲染
        setTimeout(() => {
          if (map && mapRef.current) {
            map.invalidateSize();
          }
        }, 100);

      } catch (error) {
        console.error('地图初始化失败:', error);
      }
    }

    return () => {
      // 清理资源 - 改进生命周期管理
      if (planeMarkerRef.current) {
        try {
          if (mapInstanceRef.current && mapInstanceRef.current.hasLayer(planeMarkerRef.current)) {
            mapInstanceRef.current.removeLayer(planeMarkerRef.current);
          }
          planeMarkerRef.current = null;
        } catch (error) {
          console.warn('清理飞机标记时出错:', error);
        }
      }
      
      if (mapInstanceRef.current) {
        try {
          // 清理所有图层
          mapInstanceRef.current.eachLayer((layer) => {
            try {
              mapInstanceRef.current?.removeLayer(layer);
            } catch (e) {
              console.warn('清理图层时出错:', e);
            }
          });
          
          // 移除地图实例
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch (error) {
          console.warn('清理地图实例时出错:', error);
        }
      }
    };
  }, [beijingCoords, destinationCoords, flightPath]);

  // 飞行动画效果 - 优化依赖项，避免地图重复初始化
  useEffect(() => {
    console.log('=== 飞行动画效果 useEffect 触发 ===');
    console.log('isFlying:', isFlying);
    console.log('mapInstanceRef.current:', !!mapInstanceRef.current);
    console.log('flightPath.length:', flightPath.length);
    
    if (isFlying && mapInstanceRef.current && flightPath.length > 0) {
      console.log('=== 条件满足，开始创建飞机标记 ===');
      
      // 创建飞机标记（只创建一次）
      if (!planeMarkerRef.current) {
        console.log('=== 创建新的飞机标记 ===');
        console.log('起始位置:', flightPath[0]);
        
        // 计算飞机的初始方向角度
        const bearing = calculateBearing(
          beijingCoords.lat, beijingCoords.lng,
          destinationCoords.lat, destinationCoords.lng
        );
        
        // 使用带方向的飞机图标
        const planeIcon = L.divIcon({
          html: `<div class="simple-plane" style="transform: rotate(${bearing}deg);">✈️</div>`,
          className: 'plane-marker-container',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        try {
          // 确保地图实例存在且有效
          if (mapInstanceRef.current && mapInstanceRef.current.getContainer()) {
            planeMarkerRef.current = L.marker([flightPath[0].lat, flightPath[0].lng], {
              icon: planeIcon,
              zIndexOffset: 1000
            }).addTo(mapInstanceRef.current);
            
            console.log('✅ 飞机标记创建成功！');
            console.log('飞机标记对象:', planeMarkerRef.current);
            
            // 不需要强制刷新地图，避免闪烁
            // mapInstanceRef.current.invalidateSize();
          } else {
            console.error('❌ 地图实例无效，无法创建飞机标记');
          }
          
        } catch (error) {
          console.error('❌ 创建飞机标记失败:', error);
        }
      } else {
        console.log('=== 飞机标记已存在，重置位置 ===');
        planeMarkerRef.current.setLatLng([flightPath[0].lat, flightPath[0].lng]);
      }

      const interval = setInterval(() => {
        setFlightProgress(prev => {
          if (prev >= 100) {
            console.log('🎯 飞行完成！');
            setHasArrived(true);
            setIsFlying(false);
            return 100;
          }

          // 更新飞机位置（平滑移动）- 添加安全检查
          const pathIndex = Math.floor((prev / 100) * (flightPath.length - 1));
          const currentPosition = flightPath[pathIndex];
          
          if (currentPosition && planeMarkerRef.current) {
            try {
              // 检查标记是否仍然有效
              if (planeMarkerRef.current._map && planeMarkerRef.current.getLatLng) {
                console.log(`🛩️ 更新飞机位置 ${Math.round(prev)}%:`, currentPosition);
                
                // 计算当前段的方向角度（如果不是最后一个点）
                let bearing = calculateBearing(
                  beijingCoords.lat, beijingCoords.lng,
                  destinationCoords.lat, destinationCoords.lng
                );
                
                if (pathIndex < flightPath.length - 1) {
                  const nextPosition = flightPath[pathIndex + 1];
                  if (nextPosition) {
                    bearing = calculateBearing(
                      currentPosition.lat, currentPosition.lng,
                      nextPosition.lat, nextPosition.lng
                    );
                  }
                }
                
                // 更新飞机位置和方向
                planeMarkerRef.current.setLatLng([currentPosition.lat, currentPosition.lng]);
                
                // 更新飞机图标的方向
                const iconElement = planeMarkerRef.current.getElement();
                if (iconElement) {
                  const planeDiv = iconElement.querySelector('.simple-plane');
                  if (planeDiv) {
                    (planeDiv as HTMLElement).style.transform = `rotate(${bearing}deg)`;
                  }
                }
              } else {
                console.warn('飞机标记已失效，停止更新位置');
                setIsFlying(false);
              }
            } catch (error) {
              console.error('更新飞机位置时出错:', error);
              setIsFlying(false);
            }
          }

          return prev + 2; // 加快速度便于测试
        });
      }, 100); // 更快的更新频率

      return () => {
        console.log('🧹 清理飞行动画定时器');
        clearInterval(interval);
      };
    } else {
      console.log('❌ 条件不满足，无法创建飞机标记');
      if (!isFlying) console.log('- isFlying 为 false');
      if (!mapInstanceRef.current) console.log('- 地图实例不存在');
      if (flightPath.length === 0) console.log('- 飞行路径为空');
    }
  }, [isFlying]); // 移除flightPath依赖，避免重复触发

  const startJourney = () => {
    console.log('开始飞行，目标城市:', journeyData.city);
    setIsFlying(true);
    setFlightProgress(0);
    setHasArrived(false);
  };

  const resetJourney = () => {
    console.log('重置旅程');
    setFlightProgress(0);
    setIsFlying(false);
    setHasArrived(false);
    
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
                <Plane size={24} />
              </div>
            </div>
          </div>

          <div className="city-info destination">
            <MapPin className="city-icon destination-icon" />
            <div>
              <h3>{journeyData.city}</h3>
              <p>目的地机场</p>
            </div>
          </div>
        </div>

        <div className="flight-details">
          <div className="detail-item">
            <Clock size={16} />
            <span>飞行时间: {formatFlightTime(flightTime)}</span>
          </div>
          <div className="detail-item">
            <Navigation size={16} />
            <span>飞行距离: {formatDistance(distance)}</span>
          </div>
          <div className="detail-item">
            <span className="progress-text">
              飞行进度: {Math.round(flightProgress)}%
            </span>
          </div>
        </div>
      </div>

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