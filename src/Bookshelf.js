import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class Bookshelf extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    const {bookshelfTitle, booksArr} = this.props
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
           {
            booksArr &&
            booksArr.map( (book) => (
                <Book backgroundImage ={book.backgroundImage} bookTitle={book.bookTitle} bookAuthors={book.bookAuthors}/>
                )
            )
           }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
