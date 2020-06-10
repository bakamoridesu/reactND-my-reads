import React, {Component} from 'react';
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";

class ListBooks extends Component {
  categories = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read'
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.entries(this.categories).map(([shelfSysname, shelfName]) => {
              return (this.props.books[shelfSysname] &&
                <BookShelf key={shelfSysname} books={this.props.books[shelfSysname]} title={shelfName} updateBook={this.props.updateBook}/>)
            })}
          </div>
        </div>
        <div className="open-search">
            <Link
              to='/search'>Add a book</Link>
          </div>
      </div>
    )
  }
}

export default ListBooks;