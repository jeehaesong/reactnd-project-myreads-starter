import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
  }

  render() {
    const {backgroundImage,bookTitle,bookAuthors} = this.props
    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `${backgroundImage}` }}></div>
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
                <div className="book-title">{bookTitle}</div>
                <div className="book-authors">{bookAuthors}</div>
            </div>
        </li>
    )
  }
}

export default Book
