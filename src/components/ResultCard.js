import React from 'react';
import { motion } from 'framer-motion';
import './ResultCard.css';

function ResultCard({ bmi, status, advice, color, idealWeightDiff }) {
  const progress = Math.min(bmi / 40 * 100, 100);

  return (
    <motion.div
      className="result-card"
      style={{ borderColor: color }}
      whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <h2>BMI شما: {bmi}</h2>
      <p className="status" style={{ color }}>وضعیت: {status}</p>
      <div className="circle-progress">
        <svg viewBox="0 0 36 36">
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className="circle"
            stroke={color}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            initial={{ strokeDasharray: '0 100' }}
            animate={{ strokeDasharray: `${progress} ${100 - progress}` }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <text x="18" y="20.35" className="percentage">{bmi}</text>
        </svg>
      </div>
      <p className="weight-diff">
        {idealWeightDiff > 0 ? `باید ${idealWeightDiff} کیلوگرم کم کنید.` : `باید ${Math.abs(idealWeightDiff)} کیلوگرم زیاد کنید.`}
      </p>
      <div className="advice-list">
        <h3>توصیه‌ها:</h3>
        <ul>
          {advice.split('. ').map((item, index) => (
            <li key={index}><i className="fas fa-check-circle"></i> {item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default ResultCard;