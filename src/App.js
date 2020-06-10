import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import {
  Route,
  BrowserRouter as Router

} from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    shelfByID:{},
    books: {}
  }

  /*
        Performs initial data download from server
        Updates state (books, shelfByID)
   */
  componentDidMount() {
    console.log('componentDidMount')
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
  updateBook = (book, newShelf) => {
    // remember book ID
    const bookID = book.id
    // get old shelf
    const oldShelf = this.state.shelfByID[bookID]
    // change shelf of the book that being updated
    book['shelf'] = newShelf
    // change state
    this.setState((prevState) => {
      // delete book from the current shelf
      const oldShelfBooks = prevState.books[oldShelf].filter((b) => (
        b.id !== bookID
      ))
      // add book to the new shelf if new shelf is not None
      // also update shelf by ID
      const newBooks = prevState.books;
      const newShelfByID = prevState.shelfByID;
      newShelfByID[bookID] = newShelf
      newBooks[oldShelf] = oldShelfBooks
      console.log(newBooks)
      if(newShelf !== 'none'){
        newBooks[newShelf] = prevState.books[newShelf]
        newBooks[newShelf].push(book)
      }
      return {
        books: newBooks,
        shelfByID: newShelfByID
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="app">

          <Route path='/search' component={SearchBooks}/>

          <Route exact path='/' render={() => (
            <ListBooks books={this.state.books} updateBook={this.updateBook}/>
          )}/>

        </div>
      </Router>
    )
  }
}

export default BooksApp
