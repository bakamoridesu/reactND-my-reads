import React, {Component} from 'react';
import BookShelf from "./BookShelf";

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
                <BookShelf books={this.props.books[shelfSysname]} title={shelfName}/>)
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks;