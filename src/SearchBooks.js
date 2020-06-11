import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from './BooksAPI';
import BookShelf from "./BookShelf";

class SearchBooks extends Component {

  state = {
    foundBooks: [],
    searchString: ''
  }
  // if books not found, update state (set foundBooks to [])
  notFound = () => {
    this.setState({
      foundBooks: []
    })
  }
  /*
      updates state (searchString, foundBooks)
      if books are found, fills shelf for books that have one
   */
  doSearch = (evt) => {
    const query = evt.target.value
    this.setState({
      searchString: query
    })
    if(query.trim() !== '') {
      BooksAPI.search(query.trim()).then((res) => {
        if (res) {
          if (!res['error']) {
            const foundBooks = res.map((book) => {
              book['shelf'] = this.props.shelfByID[book.id] ? this.props.shelfByID[book.id] : 'none';
              return book
            })
            this.setState({
              foundBooks: foundBooks
            })
          } else {
            this.notFound()
          }
        } else {
          this.notFound()
        }
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.doSearch}
                   value={this.state.searchString}/>
          </div>
        </div>
        {this.state.foundBooks.length !== 0 && (
          <div className="search-books-results">
            <BookShelf books={this.state.foundBooks} title='Search results' updateBook={this.props.updateBook}/>
          </div>
        )}
        {this.state.foundBooks.length === 0 && (
          <div className="search-books-results">
            <h2 className="bookshelf-title">No books matching your query found.</h2>
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks;