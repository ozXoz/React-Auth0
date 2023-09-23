import Home from './components/home';
import LoginButton from './components/login';
import LogOutButton from './components/logout';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import VegetableAdd from './components/VegetableAdd';
import SeasoningAdd from './components/SeasoningAdd';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <div className="App">
        {!isAuthenticated ? <LoginButton /> : (
          <>
            <LogOutButton />
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} index />
              <Route path="/add-vegetable" element={<VegetableAdd />} />
              <Route path="/add-seasoning" element={<SeasoningAdd />} />
              {/* Add more routes as you expand your app */}
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
