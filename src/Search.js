import React from 'react'
import { Link } from 'react-router-dom'
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
    return (
        <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.serachInputValue} onChange={this.handleSearchChange}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                  noResultFound ?
                  <p>Sorry, no results were found</p> :
                  searchResult.map( (book, i)=>(
                    <Book key={`book-${i}-${book}`} book={book} onChangeShelf={this.handelShelfChangeOnSearch}/>
                  ))
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
            if(result.error === 'empty query'){
                this.setState({
                    searchResult: [],
                    noResultFound: true
                })
            }else{
                let mainIds = this.props.mainBooks.map(e=> e.id)
                let searchResult = result.map( e => {
                    if ( mainIds.indexOf(e.id) > 0 ){
                        e.shelf = this.props.mainBooks[mainIds.indexOf(e.id)].shelf
                    }
                    return e
                })
                this.setState({
                    searchResult,
                    noResultFound: false
                })
            }
            
        })
    }
  }
  
  handelShelfChangeOnSearch = (book, shelf)=>{
    this.props.onChangeShelf(book, shelf)
    let updatedSearchResult = this.state.searchResult.map(e=> {
        if(e.id === book.id){
            e.shelf = shelf
        }
        return e
    })
    this.setState({
        searchResult: updatedSearchResult
    })
  }
}

export default Search
