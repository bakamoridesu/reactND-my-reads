import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import {
  Link, Route,
  BrowserRouter as Router

} from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    shelfByID:{},
    books: {}
  }

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

  updateBook = (book, newShelf) => {
    const bookID = book.id
    const oldShelf = this.state.shelfByID[bookID]
    book['shelf'] = newShelf
    this.setState((prevState) => {
      const oldShelfBooks = prevState.books[oldShelf].filter((b) => (
        b.id !== bookID
      ))
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
          <div className="open-search">
            <Link
              to='/search'>Add a book</Link>
          </div>
        </div>
      </Router>
    )
  }
}

export default BooksApp
