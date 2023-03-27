import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import { Note as NoteType } from "./types";
import "./App.scss";


const App = () => {
  const [notes, setNotes] = useState<NoteType[]>(testNotes);
  const [filter, setFilter] = useState<string>("");
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);


  const handleSaveNote = (newNote: NoteType) => {
    let isUpdated: boolean = false;

    const newNotesList = notes.map((note) => {
      if (newNote.id === note.id) {
        isUpdated = true;
        console.log(newNote)
        return newNote;
      } else return note;
    });
    
    if (isUpdated) setNotes([...newNotesList])
    else setNotes([...notes, newNote]);
    setCurrentNote(null)
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  const handleEditNote = (note: NoteType) => {
    setCurrentNote(note);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredNotes = filter
    ? notes.filter((note) => note.tags.map(tag => tag.startsWith(filter)).includes(true))
    : notes;

  return (
    <div className="app-container">      
        <h1 className="app-title">Notes App</h1>
        <NoteForm onSaveNote={handleSaveNote} currentNote={currentNote} />
        <div className="app-filter-container">
          <form>
            <label htmlFor="filter" className="app-filter-label">
              Filter by Tag:
            </label>
            <input
              type="text"
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="app-filter-input"
            />
          </form>
        </div>      
      <NotesList
        notes={filteredNotes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
      />
    </div>
  );
};

const testNotes = [
  {
    id: "1",
    title: "Grocery List",
    content: "#milk, eggs, bread, cheese",
    tags: ["milk"],
  },
  {
    id: "2",
    title: "Task List",
    content: "Finish #project, go to gym, call #mom",
    tags: ["project", "mom"],
  },
];

export default App;
