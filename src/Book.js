import React from 'react'
import './App.css'

class Book extends React.Component {

  render() {
    const {backgroundImage, bookTitle, bookAuthors, shelf, book, onChangeShelf} = this.props
    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={e => onChangeShelf(book,e.target.value)} value={shelf}>
                    <option value="move" disabled >Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{bookTitle}</div>
                {
                    bookAuthors && 
                    bookAuthors.map( (author,idx) => <div key={`${book.id}-${idx}`} className="book-authors"> {author}</div> )
                }
            </div>
        </li>
    )
  }
}

export default Book
