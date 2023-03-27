import Note from "./Note";
import { Note as NoteType } from "../types";

type Props = {
  notes: NoteType[];
  onDeleteNote: (id: string) => void;
  onEditNote: (note: NoteType) => void;
};

const NotesList = ({ notes, onDeleteNote, onEditNote }: Props) => {
  return (
    <div className="NotesList">
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onEditNote={onEditNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
