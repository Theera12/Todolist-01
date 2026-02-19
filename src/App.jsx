import './App.css';
import TodoPage from './pages/TodoPage';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { useLocation, Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';

function App() {
  const [heading, setHeading] = useState('My Todo');
  const location = useLocation();

  useEffect(() => {
    const titleConfig = {
      '/': 'My Todo',
      '/home': 'My Todo',
      '/about': 'About',
    };

    const title = titleConfig[location.pathname.toLowerCase()] || 'Not Found';

    document.title = title;
    setHeading(title);
  }, [location.pathname]);

  return (
    <>
      <Header heading={heading} />

      <div className="body">
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/home" element={<TodoPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
