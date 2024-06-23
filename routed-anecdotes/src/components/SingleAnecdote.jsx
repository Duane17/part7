import React from 'react';
import { useParams } from 'react-router-dom';

const SingleAnecdote = ({ anecdotes, vote }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find(a => a.id === Number(id));

  if (!anecdote) {
    return <div>Anecdote not found</div>;
  }

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  );
};

export default SingleAnecdote;
