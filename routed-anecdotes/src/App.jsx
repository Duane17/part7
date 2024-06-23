import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import SingleAnecdote from './components/SingleAnecdote';
import CreateNew from './components/CreateNew';
import About from './components/About';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { useNotification, useAnecdotes } from './hooks/hooks';

const App = () => {
  const { anecdotes, addNew, vote } = useAnecdotes();
  const [notification, setNotification] = useNotification();

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification message={notification} />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes/:id" element={<SingleAnecdote anecdotes={anecdotes} vote={vote} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
