import React from 'react';
import { useNavigate } from 'react-router-dom';
import personalityData from '../data/personalityMatching.json';
import './PersonalityResult.css';

interface QuizData {
  dayOfWeek?: string;
  chineseZodiac?: string;
  westernZodiac?: string;
  mbti?: string;
  category?: string;
}

interface PersonalityResultProps {
  quizData: QuizData;
  onRetake: () => void;
}

const PersonalityResult: React.FC<PersonalityResultProps> = ({ quizData, onRetake }) => {
  const navigate = useNavigate();

  // 处理开始出发按钮点击
  const handleExplore = () => {
    const result = getRecommendationResult();
    if (result) {
      // 将推荐城市写入本地存储，供其他页面（如 /a）读取
      const cityToSlug: Record<string, string> = {
        '仰光': 'yangon',
        '蒲甘': 'bagan',
        '曼德勒': 'mandalay',
        '茵莱湖': 'inle-lake',
        '额布里海滩': 'ngapali'
      };
      try {
        const slug = cityToSlug[result.city] || cityToSlug[result.cityEn] || 'yangon';
        localStorage.setItem('recommendedCitySlug', slug);
      } catch {}

      // 传递推荐城市信息到Journey页面
      navigate('/journey', {
        state: {
          city: result.city,
          description: result.description,
          activities: result.activities,
          image: result.image
        }
      });
    }
  };

  // 根据选择的类别获取相应的推荐结果
  const getRecommendationResult = () => {
    switch (quizData.category) {
      case 'mbti':
        return personalityData.mbtiMatching[quizData.mbti as keyof typeof personalityData.mbtiMatching];
      case 'westernZodiac':
        return personalityData.zodiacMatching[quizData.westernZodiac as keyof typeof personalityData.zodiacMatching];
      case 'chineseZodiac':
        return personalityData.chineseZodiacMatching[quizData.chineseZodiac as keyof typeof personalityData.chineseZodiacMatching];
      case 'dayOfWeek':
        return personalityData.dayOfWeekMatching[quizData.dayOfWeek as keyof typeof personalityData.dayOfWeekMatching];
      default:
        return null;
    }
  };

  const result = getRecommendationResult();
  
  if (!result) {
    return <div>无法获取推荐结果</div>;
  }

  return (
    <div className="personality-result">
      <div className="result-container">
        <div className="result-header">
          <h2>🎯 你的专属缅甸文化推荐</h2>
          <p>基于你的个性分析，我们为你精心挑选了最适合的文化体验</p>
        </div>

        {/* 主要城市推荐 */}
        <div className="main-recommendation">
          <div className="recommendation-card primary">
            <div className="card-header">
              <h3>🏛️ 为你推荐的城市</h3>
              <span className="personality-badge">{result.personality}</span>
            </div>
            
            <div className="city-info">
              <div className="city-image">
                <img src={result.image} alt={result.city} />
                <div className="city-overlay">
                  <h4>{result.city}</h4>
                  <p>{result.cityEn}</p>
                </div>
              </div>
              
              <div className="city-description">
                <p className="description-text">{result.description}</p>
                
                <div className="activities">
                  <h5>🎨 推荐体验</h5>
                  <div className="activity-tags">
                    {result.activities.map((activity, index) => (
                      <span key={index} className="activity-tag">{activity}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 根据选择的类别显示相应的详细信息 */}
        <div className="secondary-recommendations">
          <div className="recommendation-card secondary">
            <div className="card-header">
              <h3>
                {quizData.category === 'mbti' && '🧠 MBTI 人格分析'}
                {quizData.category === 'westernZodiac' && '⭐ 星座专属活动'}
                {quizData.category === 'chineseZodiac' && '🐉 生肖文化洞察'}
                {quizData.category === 'dayOfWeek' && '🐅 缅甸七日生肖特质'}
              </h3>
              <span className="category-badge">
                {quizData.category === 'mbti' && quizData.mbti}
                {quizData.category === 'westernZodiac' && quizData.westernZodiac}
                {quizData.category === 'chineseZodiac' && quizData.chineseZodiac}
                {quizData.category === 'dayOfWeek' && quizData.dayOfWeek}
              </span>
            </div>
            
            <div className="category-content">
              <div className="trait-highlight">
                <span className="trait-label">个性特质：</span>
                <span className="trait-value">{result.personality || result.trait}</span>
              </div>
              <p className="recommendation-text">{result.description}</p>
            </div>
          </div>
        </div>

        {/* 个人信息总结 */}
        <div className="personal-summary">
          <h3>📊 你的个性档案</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">选择类别</span>
              <span className="summary-value">
                {quizData.category === 'mbti' && 'MBTI 人格类型'}
                {quizData.category === 'westernZodiac' && '西方星座'}
                {quizData.category === 'chineseZodiac' && '中国生肖'}
                {quizData.category === 'dayOfWeek' && '缅甸七日生肖'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">你的选择</span>
              <span className="summary-value">
                {quizData.category === 'mbti' && quizData.mbti}
                {quizData.category === 'westernZodiac' && quizData.westernZodiac}
                {quizData.category === 'chineseZodiac' && quizData.chineseZodiac}
                {quizData.category === 'dayOfWeek' && quizData.dayOfWeek}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">推荐城市</span>
              <span className="summary-value">{result.city}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">个性特质</span>
              <span className="summary-value">{result.personality || result.trait}</span>
            </div>
          </div>
        </div>

        {/* 行动按钮 */}
        <div className="action-buttons">
          <button className="retake-btn" onClick={onRetake}>
            <span className="btn-icon">🔄</span>
            重新测试
          </button>
          <button className="explore-btn" onClick={handleExplore}>
            <span className="btn-icon">✈️</span>
            开始出发
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityResult;