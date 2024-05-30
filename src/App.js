// src/App.js
// ... (other imports)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Register from './components/Register';
import PrivacyPolicy from './components/RegisterForm/PrivacyPolicy';
import GDPRStatement from './components/RegisterForm/GDPRStatement';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import CompletePasswordReset from './components/CompletePasswordReset';
import ScenarioQuestion from './components/Questionnaire/ScenarioQuestion';
import Results from './components/Questionnaire/Results';
import AuthContextProvider from './contexts/AuthContext';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<CompletePasswordReset/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/" element={<Questionnaire/>}/>
          <Route path="/results/:resultId" element={<Results />} />
          <Route path="/scenario-questions" element={<ScenarioQuestion/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="/gdpr" element={<GDPRStatement/>}/>
        </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </Router >
  );
}

export default App;
