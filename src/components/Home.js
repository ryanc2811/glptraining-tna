// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard.css';
function Home() {
  return (
    <div>
      <h1>Training Needs Analysis (TNA)</h1>
      <Link to="/initial-questions/upskill">Start Questionnaire</Link>
    </div>
  );
}

export default Home;
