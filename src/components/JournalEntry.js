import React, { useState } from 'react';

function JournalEntry({ entry, editEntry, deleteEntry }) {
  const { id, date, positiveThings, negativeThings, otherThoughts, tags } = entry;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPositiveThings, setUpdatedPositiveThings] = useState(positiveThings);
  const [updatedNegativeThings, setUpdatedNegativeThings] = useState(negativeThings);
  const [updatedOtherThoughts, setUpdatedOtherThoughts] = useState(otherThoughts);
  const [updatedTags, setUpdatedTags] = useState(tags.join(', '));
  const [editingField, setEditingField] = useState(null); // Track the editing field

  const handleEdit = () => setIsEditing(!isEditing);
  
  const handleSave = () => {
    editEntry(id, {
      date,
      positiveThings: updatedPositiveThings,
      negativeThings: updatedNegativeThings,
      otherThoughts: updatedOtherThoughts,
      tags: updatedTags.split(',').map(tag => tag.trim()),
    });
    setIsEditing(false);
    setEditingField(null);
  };

  return (
    <div className={`journal-entry ${isEditing ? 'editing' : ''}`}>
      <h3>{date}</h3>

      {isEditing ? (
        <>
          {editingField && <div className="editing-field-name">{`Editing ${editingField}`}</div>}
          
          <label htmlFor="positiveThings">Positive Things:</label>
          <textarea
            id="positiveThings"
            value={updatedPositiveThings}
            onChange={(e) => setUpdatedPositiveThings(e.target.value)}
            onFocus={() => setEditingField('Positive Things')}
            onBlur={() => setEditingField(null)}
            placeholder="Edit positive things..."
            className="edit-field"
          />

          <label htmlFor="negativeThings">Negative Things:</label>
          <textarea
            id="negativeThings"
            value={updatedNegativeThings}
            onChange={(e) => setUpdatedNegativeThings(e.target.value)}
            onFocus={() => setEditingField('Negative Things')}
            onBlur={() => setEditingField(null)}
            placeholder="Edit negative things..."
            className="edit-field"
          />

          <label htmlFor="otherThoughts">Other Thoughts:</label>
          <textarea
            id="otherThoughts"
            value={updatedOtherThoughts}
            onChange={(e) => setUpdatedOtherThoughts(e.target.value)}
            onFocus={() => setEditingField('Other Thoughts')}
            onBlur={() => setEditingField(null)}
            placeholder="Edit other thoughts..."
            className="edit-field"
          />

          <label htmlFor="tags">Tags:</label>
          <input
            id="tags"
            type="text"
            value={updatedTags}
            onChange={(e) => setUpdatedTags(e.target.value)}
            onFocus={() => setEditingField('Tags')}
            onBlur={() => setEditingField(null)}
            placeholder="Edit tags (separated by commas)"
            className="edit-field"
          />

          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Positive:</strong> {positiveThings}</p>
          <p><strong>Negative:</strong> {negativeThings}</p>
          <p><strong>Other Thoughts:</strong> {otherThoughts}</p>
          {tags.length > 0 && (
            <div className="tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => deleteEntry(id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default JournalEntry;
