import React from 'react'
import './App.css'
import Book from './Book'

class Bookshelf extends React.Component {

  render() {
    const {bookshelfTitle, booksArr, onChangeShelf} = this.props
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
           {
            booksArr &&
            booksArr.map( (book, i) => (
                <Book key={`book-${i}-${book}`} backgroundImage ={book.imageLinks.smallThubnail || book.imageLinks.thumbnail } bookTitle={book.title} bookAuthors={book.authors} shelf ={book.shelf} book={book} onChangeShelf={onChangeShelf}/>
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
