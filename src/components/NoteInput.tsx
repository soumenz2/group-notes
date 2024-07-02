import React, { useState } from 'react';
import Image from '../assets/Vector.png'

interface NoteInputProps {
  addNote: (content: string) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ addNote }) => {
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      addNote(note);
      setNote('');
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your text here..."
        className="border p-2 w-full mb-2 rounded-l"
        onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
      />
      <button className="p-2 bg-gray-200 rounded-r" onClick={handleAddNote}>
       <img src={Image} alt="" />
      </button>
    </div>
  );
};

export default NoteInput;
