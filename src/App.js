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
    books: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      const books = {}
      for (const book of res) {
        if (!books[book.shelf]) {
          books[book.shelf] = []
          books[book.shelf].push(book)
        } else {
          books[book.shelf].push(book)
        }
      }
      this.setState({
        books: books
      })
    })
  }

  render() {
    console.log(this.state.books);
    return (
      <Router>
        <div className="app">
          <Route path='/search' component={SearchBooks}/>
          <Route exact path='/' render={() => (
            <ListBooks books={this.state.books}/>
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
