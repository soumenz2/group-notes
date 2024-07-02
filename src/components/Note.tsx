import React from 'react';

interface Note {
  content: string;
  createdAt: number;
}

interface NoteProps {
  note: Note;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  const formattedDate = new Date(note.createdAt).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="border p-2 mb-2 rounded flex px-4">
      <small>{formattedDate}</small>
      <div className='mx-8'><p>{note.content}</p></div>
      
      <br />
    </div>
  );
};

export default Note;
