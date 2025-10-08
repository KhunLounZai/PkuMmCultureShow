// 地理计算工具函数

// 城市坐标数据
export interface CityCoordinates {
  lat: number;
  lng: number;
  name: string;
}

export const CITY_COORDINATES: Record<string, CityCoordinates> = {
  '北京': { lat: 39.9042, lng: 116.4074, name: '北京' },
  '仰光': { lat: 16.8661, lng: 96.1951, name: '仰光' },
  '蒲甘': { lat: 21.1717, lng: 94.8574, name: '蒲甘' },
  '曼德勒': { lat: 21.9588, lng: 96.0891, name: '曼德勒' },
  '茵莱湖': { lat: 20.5792, lng: 96.9019, name: '茵莱湖' },
  '额布里海滩': { lat: 18.3050, lng: 94.4251, name: '额布里海滩' }
};

// 将角度转换为弧度
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 使用Haversine公式计算两点间的距离（公里）
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371; // 地球半径（公里）
  
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

// 根据城市名称获取坐标
export function getCityCoordinates(cityName: string): CityCoordinates | null {
  return CITY_COORDINATES[cityName] || null;
}

// 计算飞行时间（小时）
export function calculateFlightTime(distanceKm: number): number {
  // 商业航班平均速度约为 850 km/h
  const averageSpeed = 850;
  return distanceKm / averageSpeed;
}

// 格式化距离显示
export function formatDistance(distanceKm: number): string {
  if (distanceKm >= 1000) {
    return `${(distanceKm / 1000).toFixed(1)}千公里`;
  }
  return `${Math.round(distanceKm)}公里`;
}

// 格式化飞行时间显示
export function formatFlightTime(hours: number): string {
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  
  if (h === 0) {
    return `${m}分钟`;
  } else if (m === 0) {
    return `${h}小时`;
  } else {
    return `${h}小时${m}分钟`;
  }
}

// 计算两点间的中点（用于地图中心定位）
export function calculateMidpoint(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): { lat: number; lng: number } {
  const dLng = toRadians(lng2 - lng1);
  
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);
  const lng1Rad = toRadians(lng1);
  
  const bx = Math.cos(lat2Rad) * Math.cos(dLng);
  const by = Math.cos(lat2Rad) * Math.sin(dLng);
  
  const lat3 = Math.atan2(
    Math.sin(lat1Rad) + Math.sin(lat2Rad),
    Math.sqrt((Math.cos(lat1Rad) + bx) * (Math.cos(lat1Rad) + bx) + by * by)
  );
  
  const lng3 = lng1Rad + Math.atan2(by, Math.cos(lat1Rad) + bx);
  
  return {
    lat: lat3 * (180 / Math.PI),
    lng: lng3 * (180 / Math.PI)
  };
}

// 计算两点间的方位角（度数）
export function calculateBearing(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): number {
  const lat1Rad = toRadians(startLat);
  const lat2Rad = toRadians(endLat);
  const dLngRad = toRadians(endLng - startLng);
  
  const y = Math.sin(dLngRad) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLngRad);
  
  const bearingRad = Math.atan2(y, x);
  const bearingDeg = bearingRad * (180 / Math.PI);
  
  // 将角度标准化到 0-360 度
  return (bearingDeg + 360) % 360;
}

// 生成飞行路径点（用于动画）
export function generateFlightPath(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  numPoints: number = 50
): Array<{ lat: number; lng: number }> {
  const points: Array<{ lat: number; lng: number }> = [];
  
  for (let i = 0; i <= numPoints; i++) {
    const ratio = i / numPoints;
    
    // 简单的线性插值（实际应用中可以使用大圆路径）
    const lat = startLat + (endLat - startLat) * ratio;
    const lng = startLng + (endLng - startLng) * ratio;
    
    points.push({ lat, lng });
  }
  
  return points;
}