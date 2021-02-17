import React, { useState, useEffect } from 'react'
import noteService from '../services/notes'

const NoteContent = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <li className='note'>
      {note.content} || {note.date} || Marked as: "{note.important ? 'important' : 'not important'}" ||
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

const Note = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [newDate, setNewDate] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Get notes from db
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  // Adding new note to table. Only add new entries with custom or current date.
  const addNote = (event) => {
    event.preventDefault();
    if(notes.filter(note => note.content === newNote).length === 0) {
      const noteObject = {
        content: newNote,
        date: newDate !== '' ? newDate : new Date().toISOString(),
        important: Math.random() > 0.5,
        id: notes.length + 1,
      }
      // Add to database
      noteService
        .create(noteObject)
        .then(returnedNote => setNotes(notes.concat(returnedNote)))
    }
    else
      alert(`Note with content "${newNote}" has already been added to notes`);
    
    setNewDate('');
    setNewNote('');
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    // Table where the only changed is the one which importance was changed
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // When content of form is changed
  const handleDateChange = (event) => setNewDate(event.target.value);
  const handleNoteChange = (event) => setNewNote(event.target.value);

  // Show all notes if showAll is true or only important notes
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true) // OR: notes.filter(note => note.important)

  // () => setShowAll(!showAll) changes true to false or the opposite
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div> 
      <ul>
        {notesToShow.map(note =>
          <NoteContent 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <div><h2>Add a new note</h2></div>
        <div> Custom date or leave blank for current date: <input value={newDate} onChange={handleDateChange} /> </div>
        <div> Note content (only unique content will be added): <input value={newNote} onChange={handleNoteChange} /> </div>
        <div> <button type="submit">Save</button> </div>
      </form>
    </div>
  )
}

export default Note