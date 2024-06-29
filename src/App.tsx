import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PropertyPage from './pages/PropertyPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <LandingPage />
                <div className="mt-4">
                </div>
              </div>
            }
          />
          <Route path="/properties" element={<PropertyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
