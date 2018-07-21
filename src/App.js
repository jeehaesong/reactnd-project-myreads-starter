import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
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
          <Search updateSearchPage={this._updateSearchPage} onChangeShelf ={this._updateBookShelf}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf bookshelfTitle={'Currently Reading'}  booksArr ={currentlyReading} onChangeShelf ={this._updateBookShelf} />
                <Bookshelf bookshelfTitle={'Want to Read'} booksArr ={wantToRead} onChangeShelf ={this._updateBookShelf}/>
                <Bookshelf bookshelfTitle={'Read'} booksArr ={read} onChangeShelf ={this._updateBookShelf}/>
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

  _updateBookShelf = (book, shelf) => {
    let newResult = this.state.result.map( e=> {
      if(e.id === book.id){
        e.shelf = shelf
      }
      return e
    })
    BooksAPI.update(book, shelf).then( result => {
      let currentlyReading = newResult.filter( e => result.currentlyReading.includes(e.id))
      let wantToRead = newResult.filter(e => result.wantToRead.includes(e.id))
      let read = newResult.filter(e => result.read.includes(e.id))
      this.setState({
        currentlyReading,
        wantToRead,
        read,
        result: newResult
      })
    })
  }

  _updateSearchPage = (bool) => {
    this.setState({ showSearchPage: bool })
  }
}

export default BooksApp
