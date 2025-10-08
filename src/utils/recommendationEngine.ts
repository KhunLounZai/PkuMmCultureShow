import citiesData from '../data/cities.json';
import recommendationsData from '../data/recommendations.json';

export interface UserPreferences {
  categories: string[];
  difficulty: string[];
  priceRange: string[];
  duration: string[];
  interests: string[];
}

export interface RecommendationScore {
  id: string;
  score: number;
  reasons: string[];
}

// 默认用户偏好
export const defaultPreferences: UserPreferences = {
  categories: ['cultural', 'natural'],
  difficulty: ['easy'],
  priceRange: ['$', '$$'],
  duration: ['半天', '1天', 'Half day', '1 day'],
  interests: ['文化', '历史', 'Culture', 'History']
};

// 计算推荐分数
export function calculateRecommendationScore(
  recommendation: any,
  preferences: UserPreferences
): RecommendationScore {
  let score = 0;
  const reasons: string[] = [];

  // 类别匹配 (权重: 30%)
  if (preferences.categories.includes(recommendation.category)) {
    score += 30;
    reasons.push('符合您的兴趣类别');
  }

  // 难度匹配 (权重: 20%)
  if (preferences.difficulty.includes(recommendation.difficulty)) {
    score += 20;
    reasons.push('难度适合您');
  }

  // 价格匹配 (权重: 15%)
  if (preferences.priceRange.includes(recommendation.price)) {
    score += 15;
    reasons.push('价格在您的预算范围内');
  }

  // 时长匹配 (权重: 15%)
  const durationMatch = preferences.duration.some(d => 
    recommendation.duration.includes(d) || recommendation.durationEn.includes(d)
  );
  if (durationMatch) {
    score += 15;
    reasons.push('时长符合您的安排');
  }

  // 兴趣标签匹配 (权重: 20%)
  const tagMatches = recommendation.tags.filter((tag: string) => 
    preferences.interests.some(interest => 
      tag.includes(interest) || interest.includes(tag)
    )
  ).length;
  
  const tagMatchesEn = recommendation.tagsEn.filter((tag: string) => 
    preferences.interests.some(interest => 
      tag.toLowerCase().includes(interest.toLowerCase()) || 
      interest.toLowerCase().includes(tag.toLowerCase())
    )
  ).length;

  const totalTagMatches = tagMatches + tagMatchesEn;
  if (totalTagMatches > 0) {
    score += Math.min(20, totalTagMatches * 5);
    reasons.push(`${totalTagMatches}个标签匹配您的兴趣`);
  }

  // 评分加成 (权重: 额外加分)
  if (recommendation.rating >= 4.5) {
    score += 10;
    reasons.push('高评分推荐');
  }

  return {
    id: recommendation.id,
    score,
    reasons
  };
}

// 获取个性化推荐
export function getPersonalizedRecommendations(
  preferences: UserPreferences = defaultPreferences,
  limit: number = 6
): any[] {
  const recommendations = recommendationsData.recommendations;
  
  // 计算每个推荐的分数
  const scoredRecommendations = recommendations.map(rec => {
    const scoreData = calculateRecommendationScore(rec, preferences);
    return {
      ...rec,
      score: scoreData.score,
      reasons: scoreData.reasons
    };
  });

  // 按分数排序并返回前N个
  return scoredRecommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// 基于城市获取推荐
export function getRecommendationsByCity(cityId: string): any[] {
  return recommendationsData.recommendations.filter(
    rec => rec.cityId === cityId
  );
}

// 基于类别获取推荐
export function getRecommendationsByCategory(category: string): any[] {
  return recommendationsData.recommendations.filter(
    rec => rec.category === category
  );
}

// 获取热门推荐（基于评分）
export function getPopularRecommendations(limit: number = 3): any[] {
  return recommendationsData.recommendations
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// 更新用户偏好
export function updateUserPreferences(
  currentPreferences: UserPreferences,
  newPreference: Partial<UserPreferences>
): UserPreferences {
  return {
    ...currentPreferences,
    ...newPreference
  };
}

// 基于用户行为学习偏好
export function learnFromUserBehavior(
  preferences: UserPreferences,
  viewedRecommendations: string[],
  likedRecommendations: string[]
): UserPreferences {
  const recommendations = recommendationsData.recommendations;
  
  // 从喜欢的推荐中学习偏好
  const likedRecs = recommendations.filter(rec => 
    likedRecommendations.includes(rec.id)
  );

  if (likedRecs.length === 0) return preferences;

  // 更新类别偏好
  const likedCategories = [...new Set(likedRecs.map(rec => rec.category))];
  const updatedCategories = [...new Set([...preferences.categories, ...likedCategories])];

  // 更新难度偏好
  const likedDifficulties = [...new Set(likedRecs.map(rec => rec.difficulty))];
  const updatedDifficulties = [...new Set([...preferences.difficulty, ...likedDifficulties])];

  // 更新兴趣标签
  const likedTags = likedRecs.flatMap(rec => [...rec.tags, ...rec.tagsEn]);
  const updatedInterests = [...new Set([...preferences.interests, ...likedTags])];

  return {
    ...preferences,
    categories: updatedCategories,
    difficulty: updatedDifficulties,
    interests: updatedInterests.slice(0, 10) // 限制兴趣数量
  };
}