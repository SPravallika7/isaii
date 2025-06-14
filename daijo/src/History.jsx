import React, { useEffect, useState } from 'react';
import './App.css';

function History() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('');
  const [highlightDate, setHighlightDate] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/entries');
      const data = await res.json();
      if(Array.isArray(data)){
        setEntries(data);
      }else{
        console.error('Expected array but got:',data);
        setEntries(data);
      }
      
    } catch (err) {
      console.error('Error fetching entries:', err);
    }
  };

  const updateEntry = async (id, field, value) => {
    const updated = entries.map(entry =>
      entry._id === id ? { ...entry, [field]: value } : entry
    );
    setEntries(updated);

    try {
      await fetch(`http://localhost:5000/api/entries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated.find(e => e._id === id)),
      });
    } catch (err) {
      console.error('Error updating entry:', err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/entries/${id}`, {
        method: 'DELETE',
      });
      setEntries(entries.filter(e => e._id !== id));
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const filtered = entries.filter(
    (entry) => !filter || entry.mood === filter || entry.date === filter
  );

  const uniqueDates = [...new Set(entries.map(entry => entry.date))];

  return (
    <div className="container">
      <h2 className="heading">Search Entries</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="select">
        <option value="">Filter by Date or Mood</option>
        <option value="😊">😊 Happy</option>
        <option value="😐">😐 Neutral</option>
        <option value="😢">😢 Sad</option>
        <option value="😠">😠 Angry</option>
        <option value="😴">😴 Tired</option>
        {uniqueDates.map((date, idx) => (
          <option key={idx} value={date}>{new Date(date).toDateString()}</option>
        ))}
      </select>

      <div className="calendar-wrap">
        <div className="react-calendar">
          {highlightDate && (
            <input type="date" className="input date-input" value={highlightDate} readOnly />
          )}
        </div>
      </div>

      <div className="entries-grid">
        {filtered.length === 0 && <p>No entries found.</p>}
        {filtered.map((entry) => (
          <div key={entry._id} className="entry-box" style={{ backgroundColor: getMoodColor(entry.mood) }}>
            <input
              type="text"
              value={entry.title}
              onChange={(e) => updateEntry(entry._id, 'title', e.target.value)}
              className="input"
            />
            <textarea
              value={entry.content}
              onChange={(e) => updateEntry(entry._id, 'content', e.target.value)}
              className="textarea"
            />
            <p><strong>Mood:</strong> {entry.mood} <strong>Date:</strong> {entry.date}</p>
            <button className="btn delete" onClick={() => deleteEntry(entry._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function getMoodColor(mood) {
  switch (mood) {
    case '😊': return '#d4edda';
    case '😐': return '#fefefe';
    case '😢': return '#f8d7da';
    case '😠': return '#f5c6cb';
    case '😴': return '#e2e3e5';
    default: return '#ffffff';
  }
}

export default History;
