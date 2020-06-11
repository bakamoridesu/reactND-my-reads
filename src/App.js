import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import NotFound from "./NotFound";
import {
  Route, Switch,
  BrowserRouter as Router

} from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    shelfByID: {},
    books: {}
  }

  /*
        Performs initial data download from server
        Updates state (books, shelfByID)
   */
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      const books = {}
      const shelfByID = {}
      for (const book of res) {
        if (!books[book.shelf]) {
          books[book.shelf] = []
          books[book.shelf].push(book)
        } else {
          books[book.shelf].push(book)
        }
        shelfByID[book.id] = book.shelf
      }
      this.setState({
        books: books,
        shelfByID: shelfByID
      })
    })
  }

  /*
       1. Updates state (books, shelfByID)
       2. Updates shelf of the book on server

       input: book instance, new shelf name
   */
  updateBook = (book, newShelf, oldShelf=null) => {
    // remember book ID
    const bookID = book.id
    // get old shelf
    if(!oldShelf){
      oldShelf = this.state.shelfByID[bookID]
    }
    // change shelf of the book that being updated
    book['shelf'] = newShelf
    // saving current state
    let prevBooks = []
    let prevShelfByID = {}
    // change state

    this.setState((prevState) => {
        // delete book from the current shelf

        // add book to the new shelf if new shelf is not None
        // also update shelf by ID
        prevBooks = prevState.books;
        prevShelfByID = prevState.shelfByID;
        const newBooks = prevState.books;
        const newShelfByID = prevState.shelfByID;
        newShelfByID[bookID] = newShelf
        if (oldShelf !== 'none') {
          const oldShelfBooks = prevState.books[oldShelf].filter((b) => (
            b.id !== bookID
          ))
          newBooks[oldShelf] = oldShelfBooks
        }
        if (newShelf !== 'none') {
          newBooks[newShelf] = prevState.books[newShelf]
          newBooks[newShelf].push(book)
        }
        return {
          books: newBooks,
          shelfByID: newShelfByID
        }
      },
      () => {
        BooksAPI.update(book, newShelf)
          .catch(()=> {
            this.setState({
              books: prevBooks,
              shelfByID: prevShelfByID
            })
          })
      })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path='/search' render={() => (
              <SearchBooks updateBook={this.updateBook} shelfByID={this.state.shelfByID}/>
            )}/>
            <Route exact path='/' render={() => (
              <ListBooks books={this.state.books} updateBook={this.updateBook}/>
            )}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp
