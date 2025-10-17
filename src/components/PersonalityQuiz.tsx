import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const categories = [
    { id: 'mbti', name: t('personalityQuiz.categories.mbti.name'), icon: '🧠', description: t('personalityQuiz.categories.mbti.description') },
    { id: 'chineseZodiac', name: t('personalityQuiz.categories.chineseZodiac.name'), icon: '🐉', description: t('personalityQuiz.categories.chineseZodiac.description') },
    { id: 'dayOfWeek', name: t('personalityQuiz.categories.dayOfWeek.name'), icon: '🐅', description: t('personalityQuiz.categories.dayOfWeek.description') },
    { id: 'westernZodiac', name: t('personalityQuiz.categories.westernZodiac.name'), icon: '⭐', description: t('personalityQuiz.categories.westernZodiac.description') }
  ];

  const chineseZodiacs = t('personalityQuiz.options.chineseZodiac', { returnObjects: true }) as string[];
  
  const westernZodiacs = t('personalityQuiz.options.westernZodiac', { returnObjects: true }) as string[];

  const mbtiTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  const daysOfWeek = t('personalityQuiz.options.dayOfWeek', { returnObjects: true }) as string[];

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
          <h2>{t('personalityQuiz.header.title')}</h2>
          <p>{t('personalityQuiz.header.description')}</p>
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
                ← {t('personalityQuiz.back')}
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
                🎯 {t('personalityQuiz.submit')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityQuiz;