// src/App.js
// ... (other imports)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import InitialQuestions from './components/InitialQuestions';
import Register from './components/Register';
import Login from './components/Login';
import UpskillQuestion from './components/UpskillQuestion';
import IndustryQuestion from './components/IndustryQuestion';
import { UserTnaProvider } from './components/UserTnaContext';
import BusinessAreaQuestion from './components/BusinessAreaQuestion';
import DevelopmentAreasQuestion from './components/DevelopmentAreasQuestion';
import ScenarioQuestion from './components/ScenarioQuestion';
function App() {
  return (
    <Router>
      <UserTnaProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/initial-questions" element={<InitialQuestions />}>
            <Route path="upskill" element={<UpskillQuestion />} /> {/* This is the index route */}
            <Route path="industry" element={<IndustryQuestion />} />
            <Route path="business" element={<BusinessAreaQuestion />} />
            <Route path="development-areas" element={<DevelopmentAreasQuestion />} />
          </Route>
          <Route path='/ScenarioQuestion'element={<ScenarioQuestion/>}/>
        </Routes>
      </UserTnaProvider>
    </Router >
  );
}

export default App;
