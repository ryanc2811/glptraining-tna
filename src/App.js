// src/App.js
// ... (other imports)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Register from './components/Register';
import Login from './components/Login';
import ScenarioQuestion from './components/Questionnaire/ScenarioQuestion';

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Questionnaire/>}/>
          <Route path="/scenario-questions" element={<ScenarioQuestion/>}/>
        </Routes>
      </ThemeProvider>
    </Router >
  );
}

export default App;
