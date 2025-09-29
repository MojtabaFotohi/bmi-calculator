import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import ResultCard from './components/ResultCard';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [advice, setAdvice] = useState('');
  const [color, setColor] = useState('');
  const [idealWeightDiff, setIdealWeightDiff] = useState(0);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height || !age) return;

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    const idealWeight = (22 * heightInMeters * heightInMeters).toFixed(1);
    const diff = (weight - idealWeight).toFixed(1);
    setIdealWeightDiff(diff);

    let newStatus = '';
    let newColor = '';
    let newAdvice = '';

    if (bmiValue < 18.5) {
      newStatus = 'کم‌وزن';
      newColor = '#00ffff';
      newAdvice = 'برای افزایش وزن، رژیم غذایی غنی از پروتئین و کالری مصرف کنید. اگر سن بالای ۵۰ دارید، با پزشک مشورت کنید.';
    } else if (bmiValue < 25) {
      newStatus = 'نرمال';
      newColor = '#00ff7f';
      newAdvice = 'وزن ایده‌آل! ورزش منظم و رژیم متعادل را ادامه دهید.';
    } else if (bmiValue < 30) {
      newStatus = 'اضافه‌وزن';
      newColor = '#ffd700';
      newAdvice = 'ورزش روزانه و کاهش کالری کمک‌کننده است. برای زنان، تمرکز روی رژیم کم‌چربی.';
    } else {
      newStatus = 'چاقی';
      newColor = '#ff6347';
      newAdvice = 'با پزشک مشورت کنید. رژیم و ورزش جدی لازم است. اگر مرد هستید و سن بالای ۴۰، چک‌آپ قلبی ضروری.';
    }

    if (age > 50) newAdvice += ' با افزایش سن، متابولیسم کند می‌شود – ورزش سبک مثل پیاده‌روی پیشنهاد می‌شود.';
    if (gender === 'female') newAdvice += ' زنان ممکن است نیاز به کلسیم بیشتری داشته باشند.';

    setStatus(newStatus);
    setColor(newColor);
    setAdvice(newAdvice);
  };



  return (
    <div className="app-container">

      <Header />
      <motion.main
        className="main-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.form
          onSubmit={calculateBMI}
          className="bmi-form"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
          }}
        >
          <motion.div className="input-group" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
            <label htmlFor="weight">وزن (کیلوگرم)</label>
            <input id="weight" type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            <i key="weight-icon" className="fas fa-weight-scale icon"></i>
          </motion.div>
          <motion.div className="input-group" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
            <label htmlFor="height">قد (سانتی‌متر)</label>
            <input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
            <i key="height-icon" className="fas fa-ruler-vertical icon"></i>
          </motion.div>
          <motion.div className="input-group" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
            <label htmlFor="age">سن</label>
            <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            <i key="age-icon" className="fas fa-calendar-alt icon"></i>
          </motion.div>
          <motion.div className="input-group" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
            <label htmlFor="gender">جنسیت</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            <i key="gender-icon" className="fas fa-user icon"></i>
          </motion.div>
          <motion.button
            type="submit"
            className="calculate-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            محاسبه BMI
          </motion.button>
        </motion.form>
        {bmi && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <ResultCard bmi={bmi} status={status} advice={advice} color={color} idealWeightDiff={idealWeightDiff} />
          </motion.div>
        )}
      </motion.main>
      <footer className="footer">
        ساخته شده با ❤️ – ۲۰۲۵ 

      </footer>
    </div>
  );
}

export default App;