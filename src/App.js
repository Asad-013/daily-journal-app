import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import JournalForm from './components/JournalForm';
import JournalEntry from './components/JournalEntry';
import './App.css';

function App() {
  const [journalEntries, setJournalEntries] = useState([]);

  // Load saved entries from localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setJournalEntries(savedEntries);
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Add new journal entry
  const addEntry = (entry) => {
    setJournalEntries([...journalEntries, entry]);
  };

  // Edit existing journal entry
  const editEntry = (updatedEntry) => {
    setJournalEntries(
      journalEntries.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
  };

  // Delete a journal entry
  const deleteEntry = (id) => {
    setJournalEntries(journalEntries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="app-container">
      <h1>My Daily Journal</h1>
      <JournalForm addEntry={addEntry} />
      <div className="journal-entries">
        {journalEntries.length === 0 ? (
          <p>No entries yet. Start by adding a new journal entry!</p>
        ) : (
          <AnimatePresence>
            {journalEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <JournalEntry
                  entry={entry}
                  editEntry={editEntry}
                  deleteEntry={deleteEntry}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default App;
