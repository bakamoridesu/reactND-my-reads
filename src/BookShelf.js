import React, {Component} from 'react';
import Book from './Book'

const BookShelf = (props) => {
    const books = props.books;
    const title = props.title;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              return <Book key={book.id} book={book} updateBook={props.updateBook}/>
            })}
          </ol>
        </div>
      </div>
    )
}
export default BookShelf;