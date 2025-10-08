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
      // Home page
      home: {
        title: 'Discovering Myanmar\'s Cultural Gems',
        subtitle: 'Explore the rich culture and beautiful landscapes of Myanmar',
        welcome: 'Welcome to Myanmar Cultural Exchange',
        description: 'Immerse yourself in the fascinating culture, history, and natural beauty of Myanmar through our interactive platform.',
        startExploring: 'Start Exploring',
        meetMianMian: 'Meet MianMian, your cultural guide'
      },
      // AI Character
      ai: {
        greeting: 'Hello! I\'m MianMian, your Myanmar cultural guide. How can I help you explore Myanmar today?',
        placeholder: 'Ask me about Myanmar culture, places, or traditions...',
        send: 'Send',
        responses: {
          culture: 'Myanmar has a rich cultural heritage with over 135 ethnic groups! Each has unique traditions, languages, and customs.',
          places: 'Some must-visit places include Bagan with its ancient temples, Inle Lake with floating gardens, and the golden Shwedagon Pagoda in Yangon.',
          food: 'Myanmar cuisine is delicious! Try mohinga (fish noodle soup), tea leaf salad, and Shan noodles. Each region has its specialties.',
          festivals: 'Myanmar celebrates many colorful festivals like Thingyan (Water Festival), Tazaungdaing (Festival of Lights), and Phaung Daw Oo Pagoda Festival.',
          default: 'That\'s an interesting question! Myanmar is full of wonders. Would you like to know about our culture, places to visit, food, or festivals?'
        }
      },
      // Recommendations
      recommendations: {
        title: 'AI Smart Recommendations',
        subtitle: 'Let MianMian AI discover amazing places and experiences just for you',
        categories: {
          cultural: 'Cultural Sites',
          natural: 'Natural Wonders',
          adventure: 'Adventure',
          spiritual: 'Spiritual Journey'
        }
      },
      // Map
      map: {
        title: 'AI-Powered Myanmar Explorer',
        subtitle: 'Let MianMian guide you through Myanmar\'s cultural treasures with intelligent recommendations'
      },
      // Videos
      videos: {
        title: 'AI Video Tour Guide',
        subtitle: 'Experience Myanmar through MianMian\'s curated immersive video collection'
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try Again',
        learnMore: 'Learn More'
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
      // Home page
      home: {
        title: '发现缅甸文化瑰宝',
        subtitle: '探索缅甸丰富的文化和美丽的风景',
        welcome: '欢迎来到缅甸文化交流平台',
        description: '通过我们的互动平台，沉浸在缅甸迷人的文化、历史和自然美景中。',
        startExploring: '开始探索',
        meetMianMian: '认识缅缅，您的文化向导'
      },
      // AI Character
      ai: {
        greeting: '你好！我是缅缅，您的缅甸文化向导。今天我可以如何帮助您探索缅甸呢？',
        placeholder: '问我关于缅甸文化、地点或传统的问题...',
        send: '发送',
        responses: {
          culture: '缅甸拥有丰富的文化遗产，有135个以上的民族！每个民族都有独特的传统、语言和习俗。',
          places: '一些必游之地包括拥有古老寺庙的蒲甘、有浮动花园的茵莱湖，以及仰光的金色大金塔。',
          food: '缅甸菜很美味！试试鱼汤面条(mohinga)、茶叶沙拉和掸族面条。每个地区都有自己的特色菜。',
          festivals: '缅甸庆祝许多多彩的节日，如泼水节、点灯节和瑞光大金塔节。',
          default: '这是个有趣的问题！缅甸充满了奇迹。您想了解我们的文化、旅游景点、美食还是节日呢？'
        }
      },
      // Recommendations
      recommendations: {
        title: 'AI智能推荐',
        subtitle: '让缅缅AI为您发现专属的精彩地点和体验',
        categories: {
          cultural: '文化遗址',
          natural: '自然奇观',
          adventure: '冒险体验',
          spiritual: '心灵之旅'
        }
      },
      // Map
      map: {
        title: 'AI智能缅甸探索',
        subtitle: '让缅缅AI带您智能探索缅甸文化宝藏'
      },
      // Videos
      videos: {
        title: 'AI视频导游',
        subtitle: '通过缅缅AI精选的沉浸式视频深度体验缅甸'
      },
      // Common
      common: {
        loading: '加载中...',
        error: '出现了问题',
        retry: '重试',
        learnMore: '了解更多'
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