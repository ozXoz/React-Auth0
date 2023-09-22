import Home from './components/home';
import LoginButton from './components/login';
import LogOutButton from './components/logout';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <div className="App">
        {!isAuthenticated ? <LoginButton /> : <><LogOutButton /><Home /></>}
        <p>The users information is below</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
