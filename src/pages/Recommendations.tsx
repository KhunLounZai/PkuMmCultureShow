import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, MapPin, Clock, Star, Filter } from 'lucide-react';
import { 
  getPersonalizedRecommendations, 
  getRecommendationsByCategory,
  defaultPreferences,
  UserPreferences
} from '../utils/recommendationEngine';
import recommendationsData from '../data/recommendations.json';
import PersonalityQuiz from '../components/PersonalityQuiz';
import PersonalityResult from '../components/PersonalityResult';
import Robot3D from '../components/Robot3D';

interface QuizData {
  dayOfWeek?: string;
  chineseZodiac?: string;
  westernZodiac?: string;
  mbti?: string;
  category?: string;
}

const Recommendations: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(true);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  const categories = [
    { id: 'all', name: t('recommendations.categories.all') },
    { id: 'cultural', name: t('recommendations.categories.cultural') },
    { id: 'natural', name: t('recommendations.categories.natural') },
    { id: 'spiritual', name: t('recommendations.categories.spiritual') },
    { id: 'adventure', name: t('recommendations.categories.adventure') }
  ];

  useEffect(() => {
    if (selectedCategory === 'all') {
      setRecommendations(getPersonalizedRecommendations(userPreferences));
    } else {
      setRecommendations(getRecommendationsByCategory(selectedCategory));
    }
  }, [selectedCategory, userPreferences]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriceDisplay = (price: string) => {
    return price;
  };

  const handleQuizComplete = (data: QuizData) => {
    setQuizData(data);
    setShowQuiz(false);
  };

  const handleRetakeQuiz = () => {
    setShowQuiz(true);
    setQuizData(null);
  };

  // 如果显示测试问卷
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{t('recommendations.title')}</h1>

          </div>
        </div>
        
        <PersonalityQuiz onComplete={handleQuizComplete} />
        <Robot3D />
      </div>
    );
  }

  // 如果显示测试结果
  if (quizData && !showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{t('recommendations.title')}</h1>

          </div>
        </div>
        
        <PersonalityResult quizData={quizData} onRetake={handleRetakeQuiz} />
        <Robot3D />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">{t('recommendations.title')}</h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-base">
              <span dangerouslySetInnerHTML={{ __html: t('recommendations.smartRecommendation') }} />
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-base font-semibold text-gray-800">{t('recommendations.filterByCategory')}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>



        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(recommendation => (
            <div key={recommendation.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-40">
                <img 
                  src={recommendation.image} 
                  alt={i18n.language === 'zh' ? recommendation.name : recommendation.nameEn}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(recommendation.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      favorites.includes(recommendation.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                    {t(`recommendations.categories.${recommendation.category}`)}
                  </span>
                </div>

                {/* Score Badge (for personalized recommendations) */}
                {recommendation.score && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                      {t('recommendations.matchScore', { score: Math.round(recommendation.score) })}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {i18n.language === 'zh' ? recommendation.name : recommendation.nameEn}
                </h3>
                
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {i18n.language === 'zh' ? recommendation.description : recommendation.descriptionEn}
                </p>

                {/* Details */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{i18n.language === 'zh' ? recommendation.duration : recommendation.durationEn}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">{recommendation.rating}</span>
                    <span className="text-gray-400">•</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${getDifficultyColor(recommendation.difficulty)}`}>
                      {recommendation.difficulty}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 font-medium text-xs">{getPriceDisplay(recommendation.price)}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {(i18n.language === 'zh' ? recommendation.tags : recommendation.tagsEn)
                    .slice(0, 3)
                    .map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1.5">{t('recommendations.highlights')}</h4>
                  <div className="flex flex-wrap gap-1">
                    {(i18n.language === 'zh' ? recommendation.highlights : recommendation.highlightsEn)
                      .slice(0, 2)
                      .map((highlight: string, index: number) => (
                      <span key={index} className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[11px] rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendation Reasons (for personalized) */}
                {recommendation.reasons && recommendation.reasons.length > 0 && (
                  <div className="mb-3 p-2 bg-green-50 rounded">
                    <p className="text-[11px] text-green-700">
                      <span className="font-medium">{t('recommendations.reasons')}</span>
                      {recommendation.reasons.slice(0, 2).join('，')}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-red-600 to-amber-600 text-white py-2 px-3 rounded-lg hover:from-red-700 hover:to-amber-700 transition-colors text-sm">
                  {t('recommendations.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-base font-medium text-gray-600 mb-2">{t('recommendations.noRecommendations')}</h3>
            <p className="text-gray-500 text-sm">{t('recommendations.tryOtherCategories')}</p>
          </div>
        )}
      </div>
      <Robot3D />
    </div>
  );
};

export default Recommendations;