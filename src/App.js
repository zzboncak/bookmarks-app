import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import UpdateBookmark from './UpdateBookmark/UpdateBookmark';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';


class App extends Component {
  state = {
    page: 'list',
    bookmarks: [],
    error: null,
  };

  changePage = (page) => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
      page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  updateBookmark = updatedBookmark => {
    let otherBookmarks = this.state.bookmarks.filter(bm => bm.id !== updatedBookmark.id);
    otherBookmarks.push(updatedBookmark)
    this.setState({
      bookmarks: otherBookmarks
    });
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav history={this.props.history} clickPage={this.changePage} />
        <div className='content' aria-live='polite'>
            <Route
              exact
              path='/'
              render={({history}) => {
                return <BookmarkList 
                          bookmarks={this.state.bookmarks} 
                          history={history}
                        />
              }}
            />
            <Route
              path='/add'
              render={({history}) => {
                return <AddBookmark history={history}/>
              }}
            />
            <Route
              path='/update/:bookmark_id'
              render={({history, match}) => {
                const bookmark = this.state.bookmarks.filter(bm => bm.id == match.params.bookmark_id);
                return <UpdateBookmark 
                          history={history} 
                          bookmarkInfo={bookmark[0]}
                          updateBookmark={this.updateBookmark}
                        />
              }}
            />
      </div>
      </main>
    );
  }
}

export default App;
