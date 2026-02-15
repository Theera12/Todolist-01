import './App.css';
import TodoPage from './pages/TodoPage';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './shared/Header';
import { useLocation, Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
function App() {
  const [heading, setHeading] = useState('My Todo');
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname.toLowerCase()) {
      case '/':
      case '/home':
        document.title = 'My Todo';
        setHeading('My Todo');
        break;

      case '/about':
        document.title = 'About';
        setHeading('About');
        break;

      default:
        document.title = 'Not Found';
        setHeading('Not Found');
        break;
    }
  }, [location]);

  return (
    <>
      <Header heading={heading} />

      <div className="body">
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/home" element={<TodoPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
          <Route />
        </Routes>

        <footer>
          <a href="https://icons8.com">Icons From Icons8</a>
          <a href="https://www.freepik.com/free-vector/elegant-round-shape-modern-background-presentation_149280077.htm#fromView=keyword&page=3&position=0&uuid=02baa1fb-ffef-4bfa-bde7-84e849aa6dc0&query=Background">
            Image by starline on Freepik
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
