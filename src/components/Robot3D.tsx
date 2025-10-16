import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Robot3D.css';

interface Robot3DProps {
  message?: string;
  showBubble?: boolean;
}

const Robot3D: React.FC<Robot3DProps> = ({ message, showBubble = true }) => {
  const [visible, setVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 }); // 相对于右下角的位置
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // 根据页面路径获取默认消息
  const getDefaultMessage = () => {
    switch (location.pathname) {
      case '/':
        return '👋 哈喽！我是缅缅AI！输入你的星座、MBTI等特征，我来为你推荐最适合的缅甸旅游地点！';
      case '/recommendations':
        return '🎯 让我来了解你的喜好！请选择一个类别，我会为你量身定制专属的缅甸文化体验推荐！';
      case '/map':
        return '🗺️ 欢迎来到智能地图！点击任意城市，我会为你介绍当地的文化特色和必游景点！';
      case '/videos':
        return '🎬 准备好沉浸式体验了吗？选择一个视频，让我带你身临其境地感受缅甸的美丽风光！';
      case '/journey':
        return '✈️ 你的缅甸之旅即将开始！跟随我的指引，探索这个神秘国度的文化宝藏吧！';
      case '/a':
        return '🌟 欢迎来到虚拟旅行体验！选择一个目的地，我会为你开启一段难忘的文化之旅！';
      default:
        return '😊 嗨！我是你的专属缅甸文化导游缅缅AI，有什么可以帮助你的吗？';
    }
  };

  const displayMessage = message || getDefaultMessage();

  // 处理鼠标按下事件
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!avatarRef.current) return;
    
    setIsDragging(true);
    const rect = avatarRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  // 处理鼠标移动事件
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = window.innerWidth - e.clientX - dragOffset.x;
    const newY = window.innerHeight - e.clientY - dragOffset.y;
    
    // 限制在屏幕边界内
    const clampedX = Math.max(20, Math.min(newX, window.innerWidth - 140));
    const clampedY = Math.max(20, Math.min(newY, window.innerHeight - 140));
    
    setPosition({ x: clampedX, y: clampedY });
  };

  // 处理鼠标释放事件
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 处理触摸事件（移动端支持）
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!avatarRef.current) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = avatarRef.current.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const newX = window.innerWidth - touch.clientX - dragOffset.x;
    const newY = window.innerHeight - touch.clientY - dragOffset.y;
    
    const clampedX = Math.max(20, Math.min(newX, window.innerWidth - 140));
    const clampedY = Math.max(20, Math.min(newY, window.innerHeight - 140));
    
    setPosition({ x: clampedX, y: clampedY });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300);
    const t2 = setTimeout(() => setBubbleVisible(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  // 气泡在显示3秒后自动隐藏，并在随后轻微移动位置
  useEffect(() => {
    if (!showBubble) return;
    let cancelled = false;
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    const startCycle = () => {
      if (cancelled) return;
      setBubbleVisible(true);
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setBubbleVisible(false);
        if (!isDragging) {
          setPosition(prev => {
            const dx = (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 4);
            const dy = (Math.random() < 0.5 ? -1 : 1) * (6 + Math.random() * 4);
            const newX = Math.max(20, Math.min(prev.x + dx, window.innerWidth - 140));
            const newY = Math.max(20, Math.min(prev.y + dy, window.innerHeight - 140));
            return { x: newX, y: newY };
          });
        }
        timers.push(setTimeout(() => {
          if (cancelled) return;
          setBubbleVisible(true);
          timers.push(setTimeout(startCycle, 7000));
        }, 800));
      }, 3000));
    };

    timers.push(setTimeout(startCycle, 1200));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [location.pathname, isDragging, showBubble]);

  // 添加全局事件监听器
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={avatarRef}
      className={`ai-avatar ${visible ? 'visible' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        right: `${position.x}px`,
        bottom: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    > 
      <div className="holo-orb" role="img" aria-label="缅缅 AI 虚拟形象">
        <div className="orb-core" aria-hidden="true" />
        <div className="orb-ring ring-1" aria-hidden="true" />
        <div className="orb-ring ring-2" aria-hidden="true" />
        <div className="orb-ring ring-3" aria-hidden="true" />

        <div className="glow" aria-hidden="true" />
      </div>
      
      {showBubble && (
        <div className={`chat-bubble ${bubbleVisible ? 'visible' : ''}`}>
          <div className="bubble-content">
            {displayMessage}
          </div>
          <div className="bubble-tail" />
        </div>
      )}
    </div>
  );
};

export default Robot3D;