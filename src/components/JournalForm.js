import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function JournalForm({ addEntry }) {
  const [date, setDate] = useState('');
  const [positiveThings, setPositiveThings] = useState('');
  const [negativeThings, setNegativeThings] = useState('');
  const [otherThoughts, setOtherThoughts] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !positiveThings || !negativeThings) {
      alert('Please fill in all required fields.');
      return;
    }

    const newEntry = {
      id: uuidv4(),
      date,
      positiveThings,
      negativeThings,
      otherThoughts,
      tags: tags.split(',').map(tag => tag.trim()) // Splitting tags by comma
    };

    addEntry(newEntry);

    // Reset form
    setDate('');
    setPositiveThings('');
    setNegativeThings('');
    setOtherThoughts('');
    setTags('');
  };

  return (
    <form className="journal-form" onSubmit={handleSubmit}>
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Positive Things:</label>
      <textarea
        value={positiveThings}
        onChange={(e) => setPositiveThings(e.target.value)}
        placeholder="What went well today?"
        required
      />

      <label>Negative Things:</label>
      <textarea
        value={negativeThings}
        onChange={(e) => setNegativeThings(e.target.value)}
        placeholder="What didn’t go well today?"
        required
      />

      <label>Other Thoughts:</label>
      <textarea
        value={otherThoughts}
        onChange={(e) => setOtherThoughts(e.target.value)}
        placeholder="Any other reflections?"
      />

      <label>Tags (separated by commas):</label>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="e.g. work, productivity, personal"
      />

      <button type="submit">Add Entry</button>
    </form>
  );
}

export default JournalForm;
