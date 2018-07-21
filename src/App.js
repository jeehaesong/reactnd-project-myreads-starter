import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    result: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount (){
    BooksAPI.getAll().then( result => {
      let currentlyReading = result.filter( e => e.shelf === 'currentlyReading')
      let wantToRead = result.filter(e => e.shelf === 'wantToRead')
      let read = result.filter(e => e.shelf === 'read')
      this.setState({
        result,
        currentlyReading,
        wantToRead,
        read
      })
    })
  }

  render() {
    const {currentlyReading,wantToRead, read } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf bookshelfTitle={'Currently Reading'}  booksArr ={currentlyReading} />
                <Bookshelf bookshelfTitle={'Want to Read'} booksArr ={wantToRead}/>
                <Bookshelf bookshelfTitle={'Read'} booksArr ={read}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
