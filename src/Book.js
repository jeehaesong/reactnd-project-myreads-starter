import React from 'react'
import './App.css'

class Book extends React.Component {

  render() {
    const {backgroundImage, bookTitle, bookAuthors, shelf} = this.props
    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="book-shelf-changer">
                    <select>
                    <option value="move" disabled >Move to...</option>
                    <option value="currentlyReading" selected ={shelf === "currentlyReading"}>Currently Reading</option>
                    <option value="wantToRead" selected ={shelf === "wantToRead"}>Want to Read</option>
                    <option value="read" selected = {shelf === "read"}>Read</option>
                    <option value="none" selected = {shelf === "none"}>None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{bookTitle}</div>
                {
                    bookAuthors && 
                    bookAuthors.map( author => <div className="book-authors"> {author}</div> )
                }
            </div>
        </li>
    )
  }
}

export default Book
