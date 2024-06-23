import React from 'react';
import { Link } from 'react-router-dom';
import { padding } from '../styles';

const Menu = () => {
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  );
};

export default Menu;
