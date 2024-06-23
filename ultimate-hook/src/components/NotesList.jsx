import React from 'react';

const NotesList = ({ notes }) => (
  <>
    <h2>notes</h2>
    {notes.map(n => <p key={n.id}>{n.content}</p>)}
  </>
);

export default NotesList;
