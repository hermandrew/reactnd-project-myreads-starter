import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class SearchBooks extends Component {
  static propTypes = {
    onUpdateBook: PropTypes.func.isRequired,
    currentBooks: PropTypes.array.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (newQuery) => {

    this.setState((state) => {state.query = newQuery})

    if (newQuery.trim().length > 0) {
      BooksAPI.search(newQuery.trim()).then((searchBooks) => {
        if (searchBooks.length > 0) {
          this.setState((state) => {
            state.books = this.sanitizeBooks(searchBooks)
          })
        } else {
          this.clearBooks()
        }
      })
    } else {
      this.clearBooks()
    }
  }

  sanitizeBooks = (books) => {
    return books.map((book) => {
      book.authors = book.authors ? book.authors : []
      return book
    })
  }

  clearBooks = () => {
    this.setState((state) => {
      state.books = []
    })
  }

  setBookShelves = () => {
    for (let i=0; i<this.state.books.length; i++) {
      this.state.books[i].shelf = "none"
      for (let j=0; j<this.props.currentBooks.length; j++) {
        if (this.props.currentBooks[j].id === this.state.books[i].id) {
          this.state.books[i].shelf = this.props.currentBooks[j].shelf
          break;
        }
      }
    }
  }

  render() {
    const {onUpdateBook} = this.props
    const {query, books} = this.state
    this.setBookShelves()
    const onShelves = books.filter((book) => book.shelf !== "none")
    const searchResults = books.filter((book) => book.shelf === "none")

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search by title or author"
                   value={query}
                   onChange={(e) => {
                     this.updateQuery(e.target.value)
                   }}/>

          </div>
        </div>
        <div className="search-books-results">
          {onShelves.length > 0 &&
          <Shelf books={onShelves}
                 title="On Your Shelves"
                 onUpdateBook={onUpdateBook}/>
          }
          {searchResults.length > 0 &&
          <Shelf books={books}
                 title="Search Results"
                 onUpdateBook={onUpdateBook}/>
          }
        </div>
      </div>
    )
  }
}

export default SearchBooks