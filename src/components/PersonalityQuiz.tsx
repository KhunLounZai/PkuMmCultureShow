import React, { useState } from 'react';
import './PersonalityQuiz.css';

interface QuizData {
  dayOfWeek?: string;
  chineseZodiac?: string;
  westernZodiac?: string;
  mbti?: string;
  category?: string;
}

interface PersonalityQuizProps {
  onComplete: (data: QuizData) => void;
}

type CategoryType = 'mbti' | 'chineseZodiac' | 'westernZodiac' | 'dayOfWeek' | null;

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ onComplete }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const categories = [
    { id: 'mbti', name: 'MBTI 人格类型', icon: '🧠', description: '了解你的性格特征' },
    { id: 'chineseZodiac', name: '生肖', icon: '🐉', description: '传统生肖文化' },
    { id: 'dayOfWeek', name: '缅甸七日生肖', icon: '🐅', description: '传统七日守护动物' },
    { id: 'westernZodiac', name: '星座', icon: '⭐', description: '西方星座运势' }
  ];

  const chineseZodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  
  const westernZodiacs = [
    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
    '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
  ];

  const mbtiTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  const daysOfWeek = ['周一 🐅 老虎', '周二 🦁 狮子', '周三 🐘 象', '周四 🐀 老鼠', '周五 🐹 豚鼠', '周六 🐉 龙', '周日 🦅 人身鸟首'];

  const handleCategorySelect = (categoryId: CategoryType) => {
    setSelectedCategory(categoryId);
    setSelectedValue('');
  };

  const handleValueSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedValue('');
  };

  const handleSubmit = () => {
    if (selectedCategory && selectedValue) {
      const quizData: QuizData = {
        category: selectedCategory,
        [selectedCategory]: selectedValue
      };
      onComplete(quizData);
    }
  };

  const getOptionsForCategory = () => {
    switch (selectedCategory) {
      case 'mbti':
        return mbtiTypes;
      case 'chineseZodiac':
        return chineseZodiacs;
      case 'westernZodiac':
        return westernZodiacs;
      case 'dayOfWeek':
        return daysOfWeek;
      default:
        return [];
    }
  };

  return (
    <div className="personality-quiz">
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>🔮 AI个性化推荐测试</h2>
          <p>选择一个类别，我们将为你推荐最适合的缅甸文化体验</p>
        </div>

        {!selectedCategory ? (
          // 第一级：主要类别选择
          <div className="category-selection">
            <div className="categories-grid">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="category-card"
                  onClick={() => handleCategorySelect(category.id as CategoryType)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-name">{category.name}</div>
                  <div className="category-description">{category.description}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // 第二级：具体选项选择
          <div className="options-selection">
            <div className="selection-header">
              <button className="back-btn" onClick={handleBack}>
                ← 返回
              </button>
              <h3>
                {categories.find(cat => cat.id === selectedCategory)?.icon} {' '}
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </h3>
            </div>

            <div className="options-grid">
              {getOptionsForCategory().map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`option-btn ${selectedValue === option ? 'selected' : ''}`}
                  onClick={() => handleValueSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedValue && (
              <button 
                className="submit-btn active"
                onClick={handleSubmit}
              >
                🎯 获取个性化推荐
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityQuiz;