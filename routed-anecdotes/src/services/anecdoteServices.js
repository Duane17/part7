export const addNew = (anecdote, setAnecdotes) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes => anecdotes.concat(anecdote));
  };
  
  export const anecdoteById = (id, anecdotes) =>
    anecdotes.find(a => a.id === id);
  
  export const vote = (id, anecdotes, setAnecdotes) => {
    const anecdote = anecdoteById(id, anecdotes);
  
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
  
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };
  