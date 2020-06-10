import React, {Component} from 'react';

class Book extends Component {
  render() {
    console.log('book!')
    console.log(this.props.book)
    const url = `url(${this.props.book.imageLinks.thumbnail})`;
    const title = this.props.book.title;
    const author = String(this.props.book.authors)
    const id = this.props.book.id
    return (
      <li key={id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: url
            }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    )
  }
}

export default Book;