import React from 'react';
import useField from '../hooks/useField';

const PersonsForm = ({ createPerson }) => {
  const name = useField('text');
  const number = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    createPerson({
      name: name.value,
      number: number.value
    });
    name.onChange({ target: { value: '' } });
    number.onChange({ target: { value: '' } });
  };

  return (
    <form onSubmit={handleSubmit}>
      name <input {...name} /> <br />
      number <input {...number} />
      <button>create</button>
    </form>
  );
};

export default PersonsForm;
