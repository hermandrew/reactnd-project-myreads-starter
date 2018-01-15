import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class SearchBooks extends Component {
  static propTypes = {
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: [],
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

  componentDidMount() {
    this.updateQuery('')
  }

  render() {
    const {onUpdateBook} = this.props
    const {query, books} = this.state

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
          {console.log(books)}
          <Shelf books={books}
                 title="Search Results"
                 onUpdateBook={onUpdateBook}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks