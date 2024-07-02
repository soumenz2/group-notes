import React from 'react';
import Note from './Note';

interface NoteListProps {
  notes: Notes[];
}

interface Notes {
  content: string;
  createdAt: number;

}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <div className="p-4">
      {notes.map((note, index) => (
        <Note key={index} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
