import React from 'react';
import useResource from './hooks/useResource';
import NotesForm from './components/NotesForm';
import PersonsForm from './components/PersonsForm';
import NotesList from './components/NotesList';
import PersonsList from './components/PersonsList';

const App = () => {
  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  return (
    <div>
      <h2>Notes</h2>
      <NotesForm createNote={noteService.create} />
      <NotesList notes={notes} />

      <h2>Persons</h2>
      <PersonsForm createPerson={personService.create} />
      <PersonsList persons={persons} />
    </div>
  );
};

export default App;
