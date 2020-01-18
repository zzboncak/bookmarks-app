import React from 'react';
import { Link } from 'react-router-dom';


class Nav extends React.Component {
  render() {
    return (
      <nav className='Nav'>
        <Link to='/'>
          <button>
            Bookmark List
          </button>
        </Link>
        {' '}
        <Link to='/add'>
          <button>
            Add Bookmark
          </button>
        </Link>
      </nav>
    )
  }
}

export default Nav;