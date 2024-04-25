import './App.css'
import { Routes, Route } from "react-router-dom";
import MainPage from './pages/main.page'
import LoginPage from './pages/login.page'
import PageProtect from './auth/PageProtect';
import { AuthProvider } from './auth/AuthProvider';
import Home from './container/Home';
import Sample from './container/Sample';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PageProtect><MainPage /></PageProtect>}>
          <Route path="/" element={<Home />} />
          <Route path="/sample" element={<Sample />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
