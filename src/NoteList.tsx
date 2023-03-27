import React from 'react';
import { Note } from './types';

type Props = {
  notes: Note[];
  onDeleteNote: (id: string) => void;
};

const NoteList: React.FC<Props> = ({ notes, onDeleteNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p>
            {note.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>
          <button onClick={() => onDeleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
