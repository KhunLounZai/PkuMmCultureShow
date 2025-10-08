import React, { useEffect, useState } from 'react';
import './Robot3D.css';

const Robot3D: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 延迟显示机器人，创造出现动画效果
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`robot-container ${isVisible ? 'robot-visible' : ''}`}>
      {/* 机器人主体 */}
      <div className="robot-body">
        {/* 头部 */}
        <div className="robot-head">
          {/* 天线 */}
          <div className="robot-antenna">
            <div className="antenna-ball"></div>
          </div>
          
          {/* 眼睛 */}
          <div className="robot-eyes">
            <div className="eye left-eye">
              <div className="pupil"></div>
            </div>
            <div className="eye right-eye">
              <div className="pupil"></div>
            </div>
          </div>
          
          {/* 嘴巴 */}
          <div className="robot-mouth"></div>
          
          {/* 缅缅标识 */}
          <div className="robot-logo">缅缅</div>
        </div>
        
        {/* 身体 */}
        <div className="robot-torso">
          {/* 胸前显示屏 */}
          <div className="robot-screen">
            <div className="screen-content">
              <div className="heart-beat">❤️</div>
              <div className="ai-text">AI</div>
            </div>
          </div>
          
          {/* 装饰线条 */}
          <div className="robot-lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        
        {/* 手臂 */}
        <div className="robot-arms">
          <div className="arm left-arm">
            <div className="hand"></div>
          </div>
          <div className="arm right-arm">
            <div className="hand"></div>
          </div>
        </div>
      </div>
      
      {/* 浮动粒子效果 */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* 问候气泡 */}
      <div className="greeting-bubble">
        <div className="bubble-content">
          <span className="greeting-text">你好！我是缅缅AI 🤖</span>
        </div>
        <div className="bubble-tail"></div>
      </div>
    </div>
  );
};

export default Robot3D;