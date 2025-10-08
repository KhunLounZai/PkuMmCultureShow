import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import Map from './pages/Map';
import Videos from './pages/Videos';
import Journey from './pages/Journey';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/map" element={<Map />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/journey" element={<Journey />} />
      </Routes>
    </Layout>
  );
}

export default App;
