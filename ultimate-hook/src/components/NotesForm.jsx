import React from 'react';
import useField from '../hooks/useField';

const NotesForm = ({ createNote }) => {
  const content = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    createNote({
      content: content.value
    });
    content.onChange({ target: { value: '' } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...content} />
      <button>create</button>
    </form>
  );
};

export default NotesForm;
