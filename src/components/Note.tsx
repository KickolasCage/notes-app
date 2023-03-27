import React, { useEffect, useState } from "react";
import { Note as NoteType } from "../types";
import "./Note.scss";

type Props = {
  note: NoteType;
  onDeleteNote: (id: string) => void;
  onEditNote: (id: NoteType) => void;
};

const Note = ({ note, onDeleteNote, onEditNote }: Props) => {
  const [tags, setTags] = useState(note.tags);

  const handleDeleteNote = () => {
    onDeleteNote(note.id);
  };

  const handleEditNote = () => {
    onEditNote(note)
  }

  useEffect(() => {setTags(note.tags)}, [note.tags])

  return (
    <div className="note-container">
      <div className="note-header">
        <h3 className="note-title">
          {note.title}{" "}
          <button className="note-delete" onClick={handleDeleteNote}>
            X
          </button>
          <button onClick={handleEditNote}>
            Edit
          </button>
        </h3>
      </div>
      <div className="note-content">
        <p>
          {note.content.split(" ").map((word, index) => {
            if (word.startsWith("#")) {
              return (
                <span key={index} className="tag">
                  {word}{" "}
                </span>
              );
            } else {
              return <span key={index}>{word} </span>;
            }
          })}
        </p>
        <div className="note-tags">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => setTags(tags.filter((t) => t !== tag))}
            >
              {tag}
              <span>&times;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Note;
