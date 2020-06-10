import React, {Component} from 'react';
import Book from './Book'
class BookShelf extends Component {
    books;
  render() {

    const books = this.props.books;
    const title = this.props.title; //Currently Reading
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              return <Book key={book.id} book={book} updateBook={this.props.updateBook}/>
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;