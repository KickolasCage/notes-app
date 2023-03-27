import React, { useEffect, useState } from "react";
import { Note } from "../types";
import "./NoteForm.scss";

type Props = {
  onSaveNote: (note: Note) => void;
  currentNote: Note | null;
};

const NoteForm = ({ onSaveNote, currentNote }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
  }, [currentNote]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const extractTagsFromString = (tagString: string) => {
    const tagArray = tagString.split(" ");
    const tags = tagArray
      .filter((tag) => tag.startsWith("#"))
      .map((tag) => tag.substring(1));
    return tags;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !content) {
      alert("Please provide both a title and content for your note.");
      return;
    }

    const newTags = extractTagsFromString(content);

    const note = {
      id: currentNote ? currentNote.id : Date.now().toString(),
      title,
      content,
      tags: newTags,
    };

    onSaveNote(note);
    setTitle("");
    setContent("");
  };


  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="note-form__field">
        <label htmlFor="title" className="note-form__label">
          Create or change title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="note-form__input"
        />
      </div>
      <div className="note-form__field">
        <label htmlFor="content" className="note-form__label">
          Add content:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          rows={6}
          className="note-form__input note-form__input--textarea"
        />
      </div>
      <button type="submit" className="note-form__button">
        Save
      </button>      
      <div className="text-display">
        <p>
            {content.split(" ").map((word, index) => {
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
      </div>
      <div className="note-tags">
          {extractTagsFromString(content).map((tag, ind) => (
            <span
              key={tag}              
            >
              {tag}
              <span key={ind}>&times;</span>
            </span>
          ))}
        </div>
    </form>
  );
};

export default NoteForm;
