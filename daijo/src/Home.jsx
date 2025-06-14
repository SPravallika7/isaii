import React, { useState } from 'react';

function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    if (!title || !content || !mood || !date) {
      alert("Please fill all fields");
      return;
    }

    const entry = { title, content, mood, date };

    try {
      const res = await fetch('http://localhost:5000/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      if (res.ok) {
        alert("Entry saved to MongoDB Atlas!");
        resetForm();
      } else {
        alert("Failed to save. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error.");
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setMood('');
    setDate('');
  };

  return (
    <div className="container">
      <h2 className="heading">Daily Log</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
      <textarea placeholder="Write your thoughts here..." value={content} onChange={(e) => setContent(e.target.value)} className="textarea"></textarea>
      <div className="mood-date-row">
        <select value={mood} onChange={(e) => setMood(e.target.value)} className="select">
          <option value="">Select Mood</option>
          <option value="😊">😊 Happy</option>
          <option value="😐">😐 Neutral</option>
          <option value="😢">😢 Sad</option>
          <option value="😠">😠 Angry</option>
          <option value="😴">😴 Tired</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input date-input" />
      </div>
      <div className="button-row center">
        <button className="btn cancel" onClick={resetForm}>Cancel</button>
        <button className="btn submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Home;
