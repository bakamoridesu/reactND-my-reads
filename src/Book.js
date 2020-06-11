import React, {Component} from 'react';

class Book extends Component {
  constructor(props) {
    super(props);
    const book = this.props.book
    this.url = book.imageLinks ?
      (book.imageLinks.thumbnail ? `url(${book.imageLinks.thumbnail})` :
        (book.imageLinks.smallThumbnail ? `url(${book.imageLinks.smallThumbnail})` : "url('/images/no_cover.png')")) :
      "url('/images/no_cover.png')";
    this.title = book.title;
    this.author = String(book.authors)
    this.id = book.id
    this.previewPage = book.previewLink ? book.previewLink : (
      book.infoLink ? book.infoLink : (
        book.canonicalVolumeLink ? book.canonicalVolumeLink : ''
      ))
    this.description = book.description ? book.description : ''
    this.state = {
      shelf: props.book.shelf
    }

  }

  /*
      updates state (shelf)
      updates book on server
   */
  handleDoubleClick = (evt) => {
    evt.preventDefault()
    if(this.previewPage !== ''){
      const win = window.open(this.previewPage, '_blank');
      win.focus();
    }
  }
  handleSelect = (evt) => {
    const oldShelf = this.state.shelf
    const newShelf = evt.target.value
    this.setState({
      shelf: newShelf
    })
    this.props.updateBook(this.props.book, newShelf, oldShelf)
  }

  render() {
    // read all data from props

    return (
      <li key={this.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: this.url,
              tooltip: 'SDFSDF'
            }} onDoubleClick={this.handleDoubleClick}>{this.description !== '' && <span>{this.description}</span>}</div>
            <div className="book-shelf-changer">
              <select onChange={this.handleSelect} value={this.state.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.title}</div>
          <div className="book-authors">{this.author}</div>
        </div>
      </li>
    )
  }
}

export default Book;