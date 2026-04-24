# Myanmar Culture Show Platform

## Video Demonstration

<video controls width="100%">
  <source src="./public/images/demon/demon.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Project Overview

The Myanmar Culture Show Platform is a modern web application built with React + TypeScript + Vite, designed to showcase Myanmar's rich cultural heritage, historical landscapes, and natural beauty through interactive experiences. The platform integrates a personalized recommendation system, interactive maps, multimedia content display, and AI flight simulation to provide users with an immersive exploration of Myanmar culture.

### Core Values
- **Cultural Dissemination**: Spread Myanmar's traditional culture and history through digital means
- **Intelligent Recommendations**: Provide personalized travel recommendations based on user personality traits
- **Interactive Experience**: Offer rich interactive features and multimedia content
- **Internationalization Support**: Complete bilingual support in Chinese and English

## Features

### 🏠 Home Page
- Project introduction and core feature showcase
- Responsive design adapted for multiple devices
- Elegant gradient backgrounds and animation effects
- Quick navigation to various functional modules

### 🎯 Personalized Recommendations
- **Personality Test System**: Multi-dimensional personality assessment based on psychological theory
- **Intelligent Matching Algorithm**: Recommend the most suitable Myanmar cities based on personality traits
- **Personalized Results**: Detailed personality analysis and city recommendation reasoning
- **Data Persistence**: Local storage of user test results

### 🗺️ Interactive Map
- High-performance map rendering based on Leaflet
- Myanmar major city markers and information display
- Multiple map layer support (street maps, satellite maps, etc.)
- Responsive map controls and interactive features

### 🎬 Multimedia Display (Videos/A Page)
- **Postcard Display**: Beautiful front and back postcard displays of 5 Myanmar cities
- **Video Playback**: City culture and landscape video content
- **Interactive City Selection**: Click map markers to switch city content
- **Fullscreen Playback Support**: Optimized video playback experience

### ✈️ AI Flight Simulation (Journey)
- Virtual flight experience from Beijing to Myanmar
- Real-time flight path animation and progress display
- Flight information panel (distance, time, coordinates, etc.)
- Offline mode support and error recovery mechanism

### 🌐 Internationalization Support
- Complete bilingual interface in Chinese and English
- Dynamic language switching functionality
- Localized date, number, and currency formats
- Culturally adapted content display

## Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern user interface library
- **TypeScript**: Type-safe JavaScript superset
- **Vite 6.3.5**: Fast build tool and development server

### Styling and UI
- **TailwindCSS 3.4.17**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Responsive Design**: Mobile-first design philosophy

### Core Dependencies
- **React Router DOM 7.9.3**: Client-side routing management
- **Leaflet 1.9.4**: Open-source mapping library
- **i18next + react-i18next**: Internationalization solution
- **Zustand 5.0.3**: Lightweight state management

### Development Tools
- **ESLint**: Code quality checking
- **PostCSS + Autoprefixer**: CSS post-processing
- **TypeScript ESLint**: TypeScript code standards

## Installation Guide

### Environment Requirements
- Node.js >= 18.0.0
- npm >= 8.0.0 or yarn >= 1.22.0

### Installation Steps

1. **Clone the Project**
```bash
git clone <repository-url>
cd PkuMmCultureShow
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

4. **Access Application**
Open your browser and visit `http://localhost:5173`

### Build and Deploy

1. **Build Production Version**
```bash
npm run build
# or
yarn build
```

2. **Preview Build Results**
```bash
npm run preview
# or
yarn preview
```

3. **Code Linting**
```bash
npm run lint
# or
yarn lint
```

## Usage Instructions

### Basic Navigation
1. Visit the homepage to understand the project overview
2. Enter the recommendations page to complete the personality test
3. View personalized city recommendation results
4. Explore Myanmar's geographical locations on the map page
5. Watch city cultural content on the videos page
6. Experience the AI flight simulation feature

### Personalized Recommendation Process
1. Click the "Start Test" button
2. Answer 12 personality test questions
3. View detailed personality analysis results
4. Get personalized city recommendations
5. Click "Start Journey" to enter flight simulation

### Multimedia Content Browsing
1. Select a city of interest on the videos page
2. View the front and back designs of city postcards
3. Watch city culture and landscape videos
4. Use fullscreen mode for a better experience

### Language Switching
- Click the language switch button in the top right corner
- Support switching between Chinese and English interfaces
- All content has corresponding localized versions

## Project Structure

```
PkuMmCultureShow/
├── public/                 # Static resources
│   ├── images/            # Image resources
│   │   ├── cities/        # City images
│   │   ├── postcards/     # Postcard images
│   │   └── videos/        # Video files
│   └── favicon.svg        # Website icon
├── src/                   # Source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── data/             # Static data
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom Hooks
│   ├── i18n/             # Internationalization config
│   └── lib/              # Third-party library config
├── .trae/                # Project documentation
└── dist/                 # Build output
```

## Deployment Instructions

### Vercel Deployment (Recommended)
1. Connect GitHub repository to Vercel
2. Configure build command: `npm run build`
3. Configure output directory: `dist`
4. Automatic deployment completion

### Other Platform Deployment
- **Netlify**: Support drag-and-drop deployment and Git integration
- **GitHub Pages**: Suitable for open-source project showcase
- **Self-hosted Server**: Use Nginx or Apache to host static files

## Contributing Guidelines

### Development Standards
- Use TypeScript for type-safe development
- Follow ESLint code standards
- Components use functional programming style
- Use Hooks for component state management

### Commit Standards
- feat: New features
- fix: Bug fixes
- docs: Documentation updates
- style: Code formatting changes
- refactor: Code refactoring
- test: Test additions or modifications
- chore: Build process or auxiliary tool changes

### Pull Request Process
1. Fork the project repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Information

- **Project Repository**: [GitHub Repository](https://github.com/your-username/PkuMmCultureShow)
- **Issue Reporting**: [GitHub Issues](https://github.com/your-username/PkuMmCultureShow/issues)
- **Documentation**: Located in the `.trae/documents/` directory

## Acknowledgments

- Thanks to all contributors who participated in this project
- Special thanks to the Myanmar cultural consultants for their guidance
- Thanks to the open-source community for providing excellent tools and libraries

---

**Myanmar Culture Show Platform** - Bridging cultures through technology, showcasing Myanmar's beauty to the world.
