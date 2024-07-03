import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PropertyPage from './pages/PropertyPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (

    <Provider store={store}>
    <Router>
      <div className="App min-h-screen bg-gray-800 flex flex-col items-center justify-center">
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
    </Provider>
  );
}

export default App;
