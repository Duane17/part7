import React from 'react';

const PersonsList = ({ persons }) => (
  <>
    <h2>persons</h2>
    {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
  </>
);

export default PersonsList;
