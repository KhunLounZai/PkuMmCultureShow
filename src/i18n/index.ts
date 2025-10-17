import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        recommendations: 'AI Recommendations - Guess You Like',
        map: 'AI Journey - Departure',
        videos: 'AI Tour Guide - Video Gallery'
      },
      // Personality Quiz
      personalityQuiz: {
        header: {
          title: '🔮 AI Personalized Recommendation Test',
          description: "Choose a category and we'll recommend the most suitable Myanmar city for your trip"
        },
        categories: {
          mbti: { name: 'MBTI Personality Type', description: 'Understand your personality traits' },
          chineseZodiac: { name: 'Chinese Zodiac', description: 'Traditional zodiac culture' },
          dayOfWeek: { name: 'Myanmar Weekly Guardian Animal', description: 'Traditional seven-day guardian animals' },
          westernZodiac: { name: 'Western Astrology', description: 'Western zodiac fortune' }
        },
        options: {
          chineseZodiac: ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'],
          westernZodiac: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
          dayOfWeek: ['Monday 🐅 Tiger', 'Tuesday 🦁 Lion', 'Wednesday 🐘 Elephant', 'Thursday 🐀 Rat', 'Friday 🐹 Guinea Pig', 'Saturday 🐉 Dragon', 'Sunday 🦅 Bird-headed Guardian']
        },
        back: 'Back',
        submit: 'Get Personalized Recommendation'
      },
      // Home page
      home: {
        title: 'Discovering Myanmar\'s Cultural Gems',
        subtitle: 'Just enter your personality traits to get travel cities that suit your personality',
        welcome: 'Welcome to Myanmar Cultural Exchange',
        description: 'Immerse yourself in the fascinating culture, history, and natural beauty of Myanmar through our interactive platform.',
        startExploring: 'Start Exploring',
        meetMianMian: 'Meet MyanMyanAi, your cultural guide',
        featuresTitle: 'Platform Features',
        featuresDescription: 'Learn about our core features and experience intelligent, immersive Myanmar cultural and travel exploration',
        features: {
          postcards: {
            title: 'Postcard Recommendations',
            description: 'City postcard recommendations based on personality traits'
          },
          map: {
            title: 'Interactive Map',
            description: 'Easily browse Myanmar cities based on OpenStreetMap and Leaflet'
          },
          videos: {
            title: 'Immersive City Videos',
            description: 'Immersive experience with 8-second AI virtual videos'
          },
          flight: {
            title: 'Flight Simulation',
            description: 'Simulate flights from Beijing to recommended cities'
          }
        }
      },
      // AI Character
      ai: {
        greeting: 'Hello! I\'m MyanMyanAi, your Myanmar cultural guide. How can I help you explore Myanmar today?',
        placeholder: 'Ask me about Myanmar culture, places, or traditions...',
        send: 'Send',
        assistant: 'MyanMyanAi Assistant',
        homeGreeting: '👋 Hello! I\'m MyanMyanAi! Enter your zodiac sign, MBTI and other traits, and I\'ll recommend the most suitable Myanmar travel destinations for you!',
        defaultGreeting: '😊 Hi! I\'m your exclusive Myanmar cultural guide MyanMyanAi, how can I help you?',
        recommendationsGreeting: '🎯 Let me get to know your preferences! Please select a category, and I\'ll recommend suitable Myanmar cities for you! After getting the recommendation results, click "Start Journey"~',
        mapGreeting: '🗺️ Welcome to the smart map! Click on any city, and I\'ll introduce you to the local cultural features and must-visit attractions!',
        videosGreeting: '🎬 Ready for an immersive experience? Choose a video, and let me take you on a journey to feel the beautiful scenery of Myanmar!',
        journeyGreeting: '✈️ Your Myanmar journey is about to begin! Follow my guidance to explore the cultural treasures of this mysterious country!',
        aPageGreeting: '🌟 Welcome to the virtual travel experience! Choose a destination, and I\'ll open an unforgettable cultural journey for you!',
        responses: {
          culture: 'Myanmar has a rich cultural heritage with over 135 ethnic groups! Each has unique traditions, languages, and customs.',
          places: 'Some must-visit places include Bagan with its ancient temples, Inle Lake with floating gardens, and the golden Shwedagon Pagoda in Yangon.',
          food: 'Myanmar cuisine is delicious! Try mohinga (fish noodle soup), tea leaf salad, and Shan noodles. Each region has its specialties.',
          festivals: 'Myanmar celebrates many colorful festivals like Thingyan (Water Festival), Tazaungdaing (Festival of Lights), and Phaung Daw Oo Pagoda Festival.',
          default: 'That\'s an interesting question! Myanmar is full of wonders. Would you like to know about our culture, places to visit, food, or festivals?'
        }
      },
      // Brand
      brand: {
        name: 'MyanMyanAi : City Postcard Recommendations & Virtual Video Tourism'
      },
      // Recommendations
      recommendations: {
        title: 'AI Smart Recommendations',
        subtitle: 'Let MyanMyanAi discover amazing places and experiences just for you',
        smartRecommendation: '🤖 <strong>MyanMyanAi Smart Recommendations:</strong> Based on your interests and browsing history, we carefully select the most suitable Myanmar cultural experiences for you!',
        filterByCategory: 'Filter by Category',
        matchScore: 'Match Score: {{score}}%',
        highlights: 'Highlights',
        reasons: 'Reasons',
        noRecommendations: 'No recommendations available',
        tryOtherCategories: 'Please try other categories or adjust filter conditions',
        viewDetails: 'View Details',
        categories: {
          all: 'All',
          cultural: 'Cultural Sites',
          natural: 'Natural Wonders',
          adventure: 'Adventure',
          spiritual: 'Spiritual Journey'
        }
      },
      // Map
      map: {
        title: 'AI-Powered Myanmar Explorer',
        subtitle: 'Let MyanMyanAi guide you through Myanmar\'s cultural treasures with intelligent recommendations',
        smartNavigation: '🗺️ <strong>MyanMyanAi Smart Navigation:</strong> Based on your location and interests, intelligently recommend the best tour routes and must-visit attractions!'
      },
      // Videos
      videos: {
        title: 'AI Video Tour Guide',
        subtitle: 'Experience Myanmar through MyanMyanAi\'s curated immersive video collection',
        smartGuide: '🎬 <strong>MyanMyanAi Video Guide</strong> Based on your interests and viewing history, we select the most exciting Myanmar cultural video content for you!',
        filterByCategory: 'Filter by Category',
        playerPlaceholder: 'Video player placeholder',
        views: 'views',
        watchVideo: 'Watch Video',
        noVideosFound: 'No videos found for this category',
        categories: {
          all: 'All',
          cultural: 'Cultural',
          natural: 'Natural',
          festival: 'Festival',
          food: 'Food'
        }
      },
      // Personality Result
      personalityResult: {
        noResult: 'Unable to get recommendation result',
        unknownTrait: 'Unknown trait',
        header: {
          title: '🎯 Your Exclusive Myanmar Cultural Recommendation',
          description: 'Based on your personality analysis, we have carefully selected the most suitable city cultural experiences for you'
        },
        left: {
          recommendedCityTitle: '🏛️ Recommended City'
        },
        activities: {
          title: '🎨 Recommended Experiences'
        },
        categoryTitles: {
          mbti: '🧠 MBTI Personality Analysis',
          westernZodiac: '⭐ Zodiac Exclusive Activities',
          chineseZodiac: '🐉 Chinese Zodiac Cultural Insights',
          dayOfWeek: '🐅 Myanmar Weekly Zodiac Traits'
        },
        traitLabel: 'Personality Trait:',
        summary: {
          title: '📊 Your Personality Profile',
          categoryLabel: 'Selected Category',
          choiceLabel: 'Your Choice',
          cityLabel: 'Recommended City',
          traitLabel: 'Personality Trait'
        },
        buttons: {
          retake: 'Retake Test',
          explore: 'Start Journey'
        }
      },
      // Journey
      journey: {
        title: 'AI Journey - Departing from Beijing',
        backButton: 'Back',
        flightInfo: 'Flight Information',
        departure: 'Beijing',
        departureAirport: 'Capital International Airport',
        destination: 'Tourist Destination',
        estimatedFlightTime: 'Estimated Flight Time',
        approximateDistance: 'Approximate Distance',
        flightProgress: 'Flight Progress',
        step: 'Step',
        realTimePosition: 'Real-time Flight Position',
        latitude: 'Latitude',
        longitude: 'Longitude',
        currentStep: 'Current Step',
        destinationLabel: 'Destination',
        recommendedActivities: 'Recommended Activities',
        startFlight: 'Start Flight',
        flyingTo: 'Flying to',
        arrived: 'Arrived at',
        startTourism: 'Start Tourism'
      },
      // A Page (Postcards & Videos)
      aPage: {
        postcardTitle: 'Get Recommended City Postcards',
        postcardReminder: '!!!Please get physical cards from staff',
        postcardDescription: 'Please get physical cards from staff',
        frontSide: 'Front',
        backSide: 'Back',
        mapVideoTitle: 'Myanmar City Map & 8-Second AI Tourism Videos',
        mapVideoDescription: 'Click on city markers on the map to view corresponding tourism videos',
        mapTitle: 'Myanmar Map',
        cityLocation: 'City Location',
        currentSelected: 'Currently Selected',
        postcardTitles: {
          beijing: 'Beijing Postcard',
          yangon: 'Yangon Postcard',
          bagan: 'Bagan Postcard',
          inleLake: 'Inle Lake Postcard'
        },
        postcardSubtitles: {
          beijing: 'Capital of China',
          yangon: 'Former Capital of Myanmar',
          bagan: 'Ancient Temple City',
          inleLake: 'Floating Garden Lake'
        },
        videoTitles: {
          culture: 'Myanmar Culture',
          bagan: 'Bagan Temples',
          yangon: 'Yangon City',
          inleLake: 'Inle Lake Life'
        },
        cityDescriptions: {
          yangon: 'Former capital with golden pagodas and colonial architecture',
          bagan: 'Ancient city with thousands of Buddhist temples',
          mandalay: 'Cultural heart of Myanmar with royal palaces',
          inleLake: 'Unique floating gardens and stilt house villages',
          ngapali: 'Pristine beaches with crystal clear waters'
        }
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try Again',
        learnMore: 'Learn More'
      },

      // Cities
      cities: {
        beijing: 'Beijing',
        yangon: 'Yangon',
        bagan: 'Bagan',
        mandalay: 'Mandalay',
        inleLake: 'Inle Lake',
        ngapali: 'Ngapali Beach'
      }
    }
  },
  zh: {
    translation: {
      // Navigation
      nav: {
        home: '首页',
        recommendations: 'AI推荐-猜你喜欢',
        map: 'AI启程-出发',
        videos: 'AI导游-视频展示'
      },
      // Personality Quiz
      personalityQuiz: {
        header: {
          title: '🔮 AI个性化推荐测试',
          description: '选择一个类别，我们将推荐最适合你旅游的缅甸城市'
        },
        categories: {
          mbti: { name: 'MBTI 人格类型', description: '了解你的性格特征' },
          chineseZodiac: { name: '生肖', description: '传统生肖文化' },
          dayOfWeek: { name: '缅甸七日生肖', description: '传统七日守护动物' },
          westernZodiac: { name: '星座', description: '西方星座运势' }
        },
        options: {
          chineseZodiac: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
          westernZodiac: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
          dayOfWeek: ['周一 🐅 老虎', '周二 🦁 狮子', '周三 🐘 象', '周四 🐀 老鼠', '周五 🐹 豚鼠', '周六 🐉 龙', '周日 🦅 人身鸟首']
        },
        back: '返回',
        submit: '获取个性化推荐'
      },
      // Home page
      home: {
        title: '发现缅甸文化瑰宝',
        subtitle: '只需要输入个性特征，即可获取适合你个性的旅游城市',
        welcome: '欢迎来到缅甸文化交流平台',
        description: '通过我们的互动平台，沉浸在缅甸迷人的文化、历史和自然美景中。',
        startExploring: '开始探索',
        meetMianMian: '认识缅缅AI，您的文化向导',
        featuresTitle: '平台功能介绍',
        featuresDescription: '了解我们的核心功能，体验智能化、沉浸式的缅甸文化与旅行探索',
        features: {
          postcards: {
            title: '明信片推荐',
            description: '基于个性特征推荐城市明信片'
          },
          map: {
            title: '交互式地图',
            description: '基于 OpenStreetMap 与 Leaflet，轻松浏览缅甸城市。'
          },
          videos: {
            title: '沉浸式城市视频',
            description: '沉浸式体验8秒AI虚拟视频。'
          },
          flight: {
            title: '模拟航班飞行',
            description: '模拟出从北京到推荐城市的航班飞行。'
          }
        }
      },
      // AI Character
      ai: {
        greeting: '你好！我是缅缅AI，您的缅甸文化向导。今天我可以如何帮助您探索缅甸呢？',
        placeholder: '问我关于缅甸文化、地点或传统的问题...',
        send: '发送',
        assistant: '缅缅AI助手',
        homeGreeting: '👋 哈喽！我是缅缅AI！输入你的星座、MBTI等特征，我来为你推荐最适合的缅甸旅游地点！',
        defaultGreeting: '😊 嗨！我是你的专属缅甸文化导游缅缅AI，有什么可以帮助你的吗？',
        recommendationsGreeting: '🎯 让我来了解你的喜好！请选择一个类别，我会为你推算出适合缅甸城市推荐！获取推荐结果后，按"开始出发吧"~',
        mapGreeting: '🗺️ 欢迎来到智能地图！点击任意城市，我会为你介绍当地的文化特色和必游景点！',
        videosGreeting: '🎬 准备好沉浸式体验了吗？选择一个视频，让我带你身临其境地感受缅甸的美丽风光！',
        journeyGreeting: '✈️ 你的缅甸之旅即将开始！跟随我的指引，探索这个神秘国度的文化宝藏吧！',
        aPageGreeting: '🌟 欢迎来到虚拟旅行体验！选择一个目的地，我会为你开启一段难忘的文化之旅！',
        responses: {
          culture: '缅甸拥有丰富的文化遗产，有135个以上的民族！每个民族都有独特的传统、语言和习俗。',
          places: '一些必游之地包括拥有古老寺庙的蒲甘、有浮动花园的茵莱湖，以及仰光的金色大金塔。',
          food: '缅甸菜很美味！试试鱼汤面条(mohinga)、茶叶沙拉和掸族面条。每个地区都有自己的特色菜。',
          festivals: '缅甸庆祝许多多彩的节日，如泼水节、点灯节和瑞光大金塔节。',
          default: '这是个有趣的问题！缅甸充满了奇迹。您想了解我们的文化、旅游景点、美食还是节日呢？'
        }
      },
      // Brand
      brand: {
        name: '缅缅Ai : 城市明信片推荐与虚拟视频旅游'
      },
      // Recommendations
      recommendations: {
        title: 'AI智能推荐',
        subtitle: '让缅缅AI为您发现专属的精彩地点和体验',
        smartRecommendation: '🤖 <strong>缅缅AI智能推荐：</strong>基于您的兴趣偏好和浏览历史，为您精心挑选最适合的缅甸文化体验！',
        filterByCategory: '分类筛选',
        matchScore: '匹配度: {{score}}%',
        highlights: '亮点特色：',
        reasons: '推荐理由：',
        noRecommendations: '暂无推荐内容',
        tryOtherCategories: '请尝试选择其他分类或调整筛选条件',
        viewDetails: '查看详情',
        categories: {
          all: '全部',
          cultural: '文化遗址',
          natural: '自然奇观',
          adventure: '冒险体验',
          spiritual: '心灵之旅'
        }
      },
      // Map
      map: {
        title: 'AI智能缅甸探索',
        subtitle: '让缅缅AI带您智能探索缅甸文化宝藏',
        smartNavigation: '🗺️ <strong>缅缅AI智能导航：</strong>根据您的位置和兴趣，智能推荐最佳游览路线和必访景点！'
      },
      // Videos
      videos: {
        title: 'AI视频导游',
        subtitle: '通过缅缅AI精选的沉浸式视频深度体验缅甸',
        smartGuide: '🎬 <strong>缅缅AI视频导游</strong>基于您的兴趣和观看历史，为您精选最精彩的缅甸文化视频内容！',
        filterByCategory: '分类筛选',
        playerPlaceholder: '视频播放器占位符',
        views: '次观看',
        watchVideo: '观看视频',
        noVideosFound: '暂无该类别的视频内容',
        categories: {
          all: '全部',
          cultural: '文化',
          natural: '自然',
          festival: '节日',
          food: '美食'
        }
      },
      // Personality Result
      personalityResult: {
        noResult: '无法获取推荐结果',
        unknownTrait: '未知特质',
        header: {
          title: '🎯 您的专属缅甸文化推荐',
          description: '基于您的个性分析，我们为您精心挑选了最适合的城市文化体验'
        },
        left: {
          recommendedCityTitle: '🏛️ 推荐城市'
        },
        activities: {
          title: '🎨 推荐体验'
        },
        categoryTitles: {
          mbti: '🧠 MBTI 人格分析',
          westernZodiac: '⭐ 星座专属活动',
          chineseZodiac: '🐉 生肖文化洞察',
          dayOfWeek: '🐅 缅甸七日生肖特质'
        },
        traitLabel: '个性特质：',
        summary: {
          title: '📊 您的个性档案',
          categoryLabel: '选择类别',
          choiceLabel: '您的选择',
          cityLabel: '推荐城市',
          traitLabel: '个性特质'
        },
        buttons: {
          retake: '重新测试',
          explore: '开始出发'
        }
      },
      // Journey
      journey: {
        title: 'AI启程 - 从北京出发',
        backButton: '返回',
        flightInfo: '航班信息',
        departure: '北京',
        departureAirport: '首都国际机场',
        destination: '旅游目的地',
        estimatedFlightTime: '预计飞行时间',
        approximateDistance: '大约距离',
        flightProgress: '飞行进度',
        step: '步骤',
        realTimePosition: '实时飞行位置',
        latitude: '纬度',
        longitude: '经度',
        currentStep: '当前步骤',
        destinationLabel: '目的地',
        recommendedActivities: '推荐活动',
        startFlight: '开始飞行',
        flyingTo: '正在飞往',
        arrived: '已抵达',
        startTourism: '开始旅游'
      },
      // A Page (Postcards & Videos)
      aPage: {
        postcardTitle: '获取推荐城市明信片',
        postcardReminder: '!!!请跟工作人员获取实体卡',
        postcardDescription: '请跟工作人员获取实体卡',
        frontSide: '正面',
        backSide: '背面',
        mapVideoTitle: '缅甸城市地图与8秒Ai旅游视频',
        mapVideoDescription: '点击地图上的城市标记查看对应的旅游视频',
        mapTitle: '缅甸地图',
        cityLocation: '城市位置',
        currentSelected: '当前选中',
        postcardTitles: {
          beijing: '北京明信片',
          yangon: '仰光明信片',
          bagan: '蒲甘明信片',
          inleLake: '茵莱湖明信片'
        },
        postcardSubtitles: {
          beijing: '中国首都',
          yangon: '缅甸前首都',
          bagan: '古代寺庙之城',
          inleLake: '浮动花园湖泊'
        },
        videoTitles: {
          culture: '缅甸文化',
          bagan: '蒲甘寺庙',
          yangon: '仰光城市',
          inleLake: '茵莱湖生活'
        },
        cityDescriptions: {
          yangon: '拥有金色佛塔和殖民建筑的前首都',
          bagan: '拥有数千座佛教寺庙的古城',
          mandalay: '拥有皇宫的缅甸文化中心',
          inleLake: '独特的浮动花园和高脚屋村庄',
          ngapali: '拥有清澈海水的原始海滩'
        }
      },
      // Common
      common: {
        loading: '加载中...',
        error: '出现了问题',
        retry: '重试',
        learnMore: '了解更多'
      },

      // Cities
      cities: {
        beijing: '北京',
        yangon: '仰光',
        bagan: '蒲甘',
        mandalay: '曼德勒',
        inleLake: '茵莱湖',
        ngapali: '额吉利海滩'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;