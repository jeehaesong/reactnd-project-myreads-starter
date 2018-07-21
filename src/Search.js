import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class Search extends React.Component {
    state = {
        searchResult: [],
        serachInputValue: '',
        noResultFound: true
      }

  render() {
    const {searchResult,noResultFound} = this.state
    const {updateSearchPage,onChangeShelf} = this.props
    return (
        <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={ ()=>updateSearchPage(false)}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.serachInputValue} onChange={this.handleSearchChange}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                  searchResult &&
                  searchResult.map( (book, i)=>(
                    <Book key={`book-${i}-${book}`} backgroundImage ={book.imageLinks.smallThubnail || book.imageLinks.thumbnail } bookTitle={book.title} bookAuthors={book.authors} shelf ={book.shelf} book={book} onChangeShelf={onChangeShelf}/>
                  ))
              }
              {
                  noResultFound &&
                  <p>Sorry, no results were found</p>
              }
              </ol>
            </div>
          </div>
    )
  }

  handleSearchChange = (e) => {
    this.setState({
        serachInputValue: e.target.value
    })
    if(e.target.value === ''){
        this.setState({
            searchResult: [],
            noResultFound: true
        })
    }else{
        BooksAPI.search(e.target.value).then(result => {
            // console.log('result',result)
            if(result.error === "empty query"){
                this.setState({
                    searchResult: [],
                    noResultFound: true
                })
            }else{
                this.setState({
                    searchResult: result,
                    noResultFound: false
                })
            }
            
        })
    }
  }
}

export default Search
