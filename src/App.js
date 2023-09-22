import logo from './logo.svg';
import './App.css';

import Home from './components/home';

import LoginButton from './components/login';

import LogOutButton from './components/logout';
function App() {
  return (
    <div className="App">
      <LoginButton />
      <LogOutButton />
      <p>The users information is below</p>
      <Home />
    </div>
  );
}

export default App;
