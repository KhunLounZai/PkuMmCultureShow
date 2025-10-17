import React from 'react';
import { useNavigate } from 'react-router-dom';
import personalityData from '../data/personalityMatching.json';
import './PersonalityResult.css';
import { useTranslation } from 'react-i18next';

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

// 定义不同类型的推荐结果接口
interface BaseRecommendation {
  city: string;
  cityEn: string;
  description: string;
  descriptionEn?: string;
  activities: string[];
  activitiesEn?: string[];
  image: string;
}

interface MBTIRecommendation extends BaseRecommendation {
  personality: string;
  personalityEn?: string;
}

interface ZodiacRecommendation extends BaseRecommendation {
  personality: string;
  personalityEn?: string;
}

interface ChineseZodiacRecommendation extends BaseRecommendation {
  trait: string;
  traitEn?: string;
  recommendation: string;
  recommendationEn?: string;
}

interface DayOfWeekRecommendation extends BaseRecommendation {
  trait?: string;
  traitEn?: string;
  personality?: string;
  personalityEn?: string;
  recommendation?: string;
  recommendationEn?: string;
} 

type RecommendationResult = MBTIRecommendation | ZodiacRecommendation | ChineseZodiacRecommendation | DayOfWeekRecommendation;

const PersonalityResult: React.FC<PersonalityResultProps> = ({ quizData, onRetake }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
        '额吉利海滩': 'ngapali'
      };
      try {
        const slug = cityToSlug[result.city] || cityToSlug[result.cityEn] || 'yangon';
        localStorage.setItem('recommendedCitySlug', slug);
      } catch {}

      // 获取城市名称（根据语言环境）
      const isEnglish = i18n.language === 'en';
      const cityName = isEnglish ? result.cityEn : result.city;
      const description = isEnglish && result.descriptionEn ? result.descriptionEn : result.description;
      const activities = isEnglish && result.activitiesEn ? result.activitiesEn : result.activities;

      // 传递推荐城市信息到Journey页面
      navigate('/journey', {
        state: {
          city: cityName,
          description: description,
          activities: activities,
          image: result.image
        }
      });
    }
  };
  
  // 添加映射对象，将英文选项值转换为中文键名
  const chineseZodiacMapping: { [key: string]: string } = {
    'Rat': '鼠',
    'Ox': '牛', 
    'Tiger': '虎',
    'Rabbit': '兔',
    'Dragon': '龙',
    'Snake': '蛇',
    'Horse': '马',
    'Goat': '羊',
    'Monkey': '猴',
    'Rooster': '鸡',
    'Dog': '狗',
    'Pig': '猪'
  };

  const westernZodiacMapping: { [key: string]: string } = {
    'Aries': '白羊座',
    'Taurus': '金牛座',
    'Gemini': '双子座',
    'Cancer': '巨蟹座',
    'Leo': '狮子座',
    'Virgo': '处女座',
    'Libra': '天秤座',
    'Scorpio': '天蝎座',
    'Sagittarius': '射手座',
    'Capricorn': '摩羯座',
    'Aquarius': '水瓶座',
    'Pisces': '双鱼座'
  };

  const dayOfWeekMapping: { [key: string]: string } = {
    'Monday 🐅 Tiger': '周一 🐅 老虎',
    'Tuesday 🦁 Lion': '周二 🦁 狮子',
    'Wednesday 🐘 Elephant': '周三 🐘 象',
    'Thursday 🐀 Rat': '周四 🐀 老鼠',
    'Friday 🐹 Guinea Pig': '周五 🐹 豚鼠',
    'Saturday 🐉 Dragon': '周六 🐉 龙',
    'Sunday 🦅 Bird-headed Guardian': '周日 🦅 人身鸟首'
  };

  const getRecommendationResult = (): RecommendationResult | null => {
    console.log('PersonalityResult - quizData:', quizData);
    console.log('PersonalityResult - category:', quizData.category);
    console.log('PersonalityResult - personalityData keys:', Object.keys(personalityData));
    
    let value: string;
    let dataKey: string;
    
    switch (quizData.category) {
      case 'mbti':
        value = quizData.mbti || '';
        dataKey = 'mbtiMatching';
        console.log('MBTI - value:', value, 'available keys:', Object.keys(personalityData.mbtiMatching || {}));
        break;
      case 'westernZodiac':
        value = quizData.westernZodiac || '';
        // 将英文星座名转换为中文
        const chineseZodiacValue = westernZodiacMapping[value] || value;
        value = chineseZodiacValue;
        dataKey = 'zodiacMatching';
        console.log('Western Zodiac - original value:', quizData.westernZodiac, 'mapped value:', value, 'available keys:', Object.keys(personalityData.zodiacMatching || {}));
        break;
      case 'chineseZodiac':
        value = quizData.chineseZodiac || '';
        // 将英文生肖名转换为中文
        const chineseValue = chineseZodiacMapping[value] || value;
        value = chineseValue;
        dataKey = 'chineseZodiacMatching';
        console.log('Chinese Zodiac - original value:', quizData.chineseZodiac, 'mapped value:', value, 'available keys:', Object.keys(personalityData.chineseZodiacMatching || {}));
        break;
      case 'dayOfWeek':
        value = quizData.dayOfWeek || '';
        // 将英文七日生肖转换为中文
        const chineseDayValue = dayOfWeekMapping[value] || value;
        value = chineseDayValue;
        dataKey = 'dayOfWeekMatching';
        console.log('Day of Week - original value:', quizData.dayOfWeek, 'mapped value:', value, 'available keys:', Object.keys(personalityData.dayOfWeekMatching || {}));
        break;
      default:
        console.log('Unknown category:', quizData.category);
        return null;
    }

    const categoryData = personalityData[dataKey as keyof typeof personalityData];
    const result = categoryData?.[value as keyof typeof categoryData];
    console.log('Final result:', result);
    
    return result || null;
  };

  // 获取个性特质的辅助函数
  const getPersonalityTrait = (result: RecommendationResult): string => {
    const isEnglish = i18n.language === 'en';
    
    if ('personality' in result && result.personality) {
      return isEnglish && result.personalityEn ? result.personalityEn : result.personality;
    }
    if ('trait' in result && result.trait) {
      return isEnglish && result.traitEn ? result.traitEn : result.trait;
    }
    return t('personalityResult.unknownTrait');
  };

  // 获取城市名称的辅助函数
  const getCityName = (result: RecommendationResult): string => {
    const isEnglish = i18n.language === 'en';
    return isEnglish ? result.cityEn : result.city;
  };

  // 获取描述文本的辅助函数
  const getDescription = (result: RecommendationResult): string => {
    const isEnglish = i18n.language === 'en';
    return isEnglish && result.descriptionEn ? result.descriptionEn : result.description;
  };

  // 获取活动列表的辅助函数
  const getActivities = (result: RecommendationResult): string[] => {
    const isEnglish = i18n.language === 'en';
    return isEnglish && result.activitiesEn ? result.activitiesEn : result.activities;
  };
  
  const result = getRecommendationResult();
  
  if (!result) {
    return <div>{t('personalityResult.noResult')}</div>;
  }

  return (
    <div className="personality-result">
      <div className="result-container">
        <div className="result-header">
          <h2>{t('personalityResult.header.title')}</h2>
          <p>{t('personalityResult.header.description')}</p>
        </div>

        {/* 主要内容区域 - 左右布局 */}
        <div className="main-content">
          {/* 左侧：主要城市推荐 */}
          <div className="left-section">
            <div className="recommendation-card primary">
              <div className="card-header">
                 <h3>{t('personalityResult.left.recommendedCityTitle')}</h3>
                 <span className="personality-badge">{getPersonalityTrait(result)}</span>
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
                  <p className="description-text">{getDescription(result)}</p>
                  
                  <div className="activities">
                    <h5>{t('personalityResult.activities.title')}</h5>
                    <div className="activity-tags">
                      {getActivities(result).map((activity, index) => (
                        <span key={index} className="activity-tag">{activity}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="personality-trait">
                    <h5>{t('personalityResult.personalityTrait')}</h5>
                    <p>{getPersonalityTrait(result)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：详细信息和个人档案 */}
          <div className="right-section">
            {/* 根据选择的类别显示相应的详细信息 */}
            <div className="recommendation-card secondary">
              <div className="card-header">
                <h3>
                  {quizData.category === 'mbti' && t('personalityResult.categoryTitles.mbti')}
                  {quizData.category === 'westernZodiac' && t('personalityResult.categoryTitles.westernZodiac')}
                  {quizData.category === 'chineseZodiac' && t('personalityResult.categoryTitles.chineseZodiac')}
                  {quizData.category === 'dayOfWeek' && t('personalityResult.categoryTitles.dayOfWeek')}
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
                   <span className="trait-label">{t('personalityResult.traitLabel')}</span>
                   <span className="trait-value">{getPersonalityTrait(result)}</span>
                 </div>
                 <p className="recommendation-text">{getDescription(result)}</p>
               </div>
            </div>

            {/* 个人信息总结 */}
            <div className="personal-summary">
              <h3>{t('personalityResult.summary.title')}</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">{t('personalityResult.summary.categoryLabel')}</span>
                  <span className="summary-value">
                    {quizData.category === 'mbti' && t('personalityResult.categoryTitles.mbti')}
                    {quizData.category === 'westernZodiac' && t('personalityResult.categoryTitles.westernZodiac')}
                    {quizData.category === 'chineseZodiac' && t('personalityResult.categoryTitles.chineseZodiac')}
                    {quizData.category === 'dayOfWeek' && t('personalityResult.categoryTitles.dayOfWeek')}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('personalityResult.summary.choiceLabel')}</span>
                  <span className="summary-value">
                    {quizData.category === 'mbti' && quizData.mbti}
                    {quizData.category === 'westernZodiac' && quizData.westernZodiac}
                    {quizData.category === 'chineseZodiac' && quizData.chineseZodiac}
                    {quizData.category === 'dayOfWeek' && quizData.dayOfWeek}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('personalityResult.summary.cityLabel')}</span>
                  <span className="summary-value">{getCityName(result)}</span>
                </div>
                <div className="summary-item">
                   <span className="summary-label">{t('personalityResult.summary.traitLabel')}</span>
                   <span className="summary-value">{getPersonalityTrait(result)}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* 行动按钮 */}
        <div className="action-buttons">
          <button className="retake-btn" onClick={onRetake}>
            <span className="btn-icon">🔄</span>
            {t('personalityResult.buttons.retake')}
          </button>
          <button className="explore-btn" onClick={handleExplore}>
            <span className="btn-icon">✈️</span>
            {t('personalityResult.buttons.explore')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityResult;